// API académica: demonstração somente, não é uma central de socorro.
const express = require('express');
const cors = require('cors');
const path = require('node:path');
const { db, filename } = require('./db');
const app = express();
app.disable('x-powered-by');
app.use(cors()); // Aberto apenas em LAN de laboratório para demonstracao; NÃO usar na internet.
app.use(express.json({ limit: '16kb' }));

function httpError(status, message) { const e = new Error(message); e.status = status; throw e; }
function idFrom(value) {
  if (!/^[1-9]\d*$/.test(String(value))) httpError(400, 'ID inválido');
  return Number(value);
}
function mustString(value, name, max = 150) {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) httpError(422, `Campo ${name} é obrigatório (máximo ${max} caracteres)`);
  return value.trim();
}
function optionalString(value, fallback, max = 150) {
  if (value == null || String(value).trim() === '') return fallback;
  return mustString(value, 'texto', max);
}
function integerBetween(value, name, min, max) {
  const n = Number(value);
  if (!Number.isInteger(n) || n < min || n > max) httpError(422, `${name} deve ser um inteiro entre ${min} e ${max}`);
  return n;
}
function shapeWorkouts(p) { return { name: mustString(p.name, 'name'), focus: optionalString(p.focus, 'Treino geral'), duration: integerBetween(p.duration, 'duration', 1, 600), day: optionalString(p.day, 'Personalizado', 60) }; }
function shapeExercises(p) {
  const workoutId = integerBetween(p.workoutId, 'workoutId', 1, 2147483647);
  if (!db.prepare('SELECT id FROM workouts WHERE id = ?').get(workoutId)) httpError(422, 'Treino de referência inexistente');
  return { name: mustString(p.name, 'name'), sets: integerBetween(p.sets, 'sets', 1, 30), reps: integerBetween(p.reps, 'reps', 1, 200), load: optionalString(p.load, 'Não informada', 60), workoutId };
}
function shapeContacts(p) { return { name: mustString(p.name, 'name'), relation: optionalString(p.relation, 'Não informada'), phone: mustString(p.phone, 'phone', 30), priority: integerBetween(p.priority, 'priority', 1, 5) }; }
function shapeIncidents(p) { return { date: mustString(p.date, 'date', 30), type: mustString(p.type, 'type', 80), description: mustString(p.description, 'description', 2000), severity: integerBetween(p.severity, 'severity', 1, 5) }; }
const definitions = {
  workouts: { table: 'workouts', columns: { name: 'name', focus: 'focus', duration: 'duration', day: 'day' }, shape: shapeWorkouts, projection: 'id,name,focus,duration,day' },
  exercises: { table: 'exercises', columns: { name: 'name', sets: 'sets', reps: 'reps', load: 'load', workoutId: 'workout_id' }, shape: shapeExercises, projection: 'id,name,sets,reps,load,workout_id AS workoutId' },
  contacts: { table: 'contacts', columns: { name: 'name', relation: 'relation', phone: 'phone', priority: 'priority' }, shape: shapeContacts, projection: 'id,name,relation,phone,priority' },
  // Quarto CRUD obrigatório de Mobile: Ocorrências (módulo atribuído ao Luhan).
  incidents: { table: 'incidents', columns: { date: 'date', type: 'type', description: 'description', severity: 'severity' }, shape: shapeIncidents, projection: 'id,date,type,description,severity' },
};
function getRow(cfg, id) {
  return db.prepare(`SELECT ${cfg.projection} FROM ${cfg.table} WHERE id=?`).get(id) || null;
}
function routes(resource, cfg) {
  const root = `/api/${resource}`;
  app.get(root, (req, res) => {
    let rows = db.prepare(`SELECT ${cfg.projection} FROM ${cfg.table} ORDER BY id DESC`).all();
    if (resource === 'exercises' && req.query.workoutId !== undefined) {
      const workoutId = idFrom(req.query.workoutId);
      rows = rows.filter(r => r.workoutId === workoutId);
    }
    res.json(rows);
  });
  app.get(`${root}/:id`, (req, res) => {
    const row = getRow(cfg, idFrom(req.params.id));
    if (!row) return res.status(404).json({ error: 'Registro não encontrado' });
    res.json(row);
  });
  app.post(root, (req, res) => {
    const data = cfg.shape(req.body || {});
    const keys = Object.keys(data), cols = keys.map(k => cfg.columns[k]);
    const info = db.prepare(`INSERT INTO ${cfg.table} (${cols.join(',')}) VALUES (${keys.map(() => '?').join(',')})`).run(...keys.map(k => data[k]));
    res.status(201).json(getRow(cfg, Number(info.lastInsertRowid)));
  });
  app.put(`${root}/:id`, (req, res) => {
    const id = idFrom(req.params.id), current = getRow(cfg, id);
    if (!current) return res.status(404).json({ error: 'Registro não encontrado' });
    const data = cfg.shape({ ...current, ...req.body });
    const keys = Object.keys(data);
    db.prepare(`UPDATE ${cfg.table} SET ${keys.map(k => `${cfg.columns[k]}=?`).join(',')} WHERE id=?`).run(...keys.map(k => data[k]), id);
    res.json(getRow(cfg, id));
  });
  app.delete(`${root}/:id`, (req, res) => {
    const id = idFrom(req.params.id);
    const result = db.prepare(`DELETE FROM ${cfg.table} WHERE id=?`).run(id);
    if (!result.changes) return res.status(404).json({ error: 'Registro não encontrado' });
    res.status(204).end();
  });
}
Object.entries(definitions).forEach(([key, cfg]) => routes(key, cfg));
app.get('/api/health', (_, res) => res.json({ status: 'ok', app: 'FitTrack', storage: 'sqlite', mode: 'demo' }));
app.get('/api/profiles/1', (_, res) => res.json(db.prepare('SELECT id,name,demo FROM profiles WHERE id=1').get()));

// SOS acadêmico: os eventos chegam APENAS ao painel de laboratório, nunca à polícia.
app.get('/api/alerts', (_, res) => {
  res.json(db.prepare(`SELECT a.id,a.profile_id AS profileId,p.name AS profileName,
    a.latitude,a.longitude,a.created_at AS createdAt,a.status
    FROM sos_alerts a JOIN profiles p ON p.id=a.profile_id ORDER BY a.id DESC LIMIT 100`).all());
});
app.post('/api/alerts', (req, res) => {
  const latitude = Number(req.body?.latitude), longitude = Number(req.body?.longitude);
  if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90 || !Number.isFinite(longitude) || longitude < -180 || longitude > 180)
    httpError(422, 'Latitude ou longitude inválida');
  const info = db.prepare('INSERT INTO sos_alerts(profile_id,latitude,longitude) VALUES (1,?,?)').run(latitude, longitude);
  const row = db.prepare(`SELECT a.id,a.profile_id AS profileId,p.name AS profileName,
    a.latitude,a.longitude,a.created_at AS createdAt,a.status
    FROM sos_alerts a JOIN profiles p ON p.id=a.profile_id WHERE a.id=?`).get(Number(info.lastInsertRowid));
  res.status(201).json(row);
});
app.patch('/api/alerts/:id/status', (req, res) => {
  const id = idFrom(req.params.id), status = req.body?.status;
  if (!['novo','em_atendimento','concluido'].includes(status)) httpError(422,'Status inválido');
  const info = db.prepare('UPDATE sos_alerts SET status=? WHERE id=?').run(status,id);
  if (!info.changes) return res.status(404).json({ error: 'Alerta não encontrado' });
  res.json(db.prepare('SELECT id, status FROM sos_alerts WHERE id=?').get(id));
});
app.get('/painel', (_,res)=> res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.use((_, res) => res.status(404).json({ error: 'Rota não encontrada' }));
app.use((err, req, res, next) => {
  const status = err.status || ((err.type === 'entity.parse.failed') ? 400 : 500);
  if (status >= 500) console.error(err);
  res.status(status).json({ error: status >= 500 ? 'Erro interno da API' : err.message });
});
const PORT = Number(process.env.PORT || 3333);
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', ()=>console.log(`FitTrack API: http://localhost:${PORT}/api/health\nPainel de demonstração: http://localhost:${PORT}/painel\nSQLite: ${filename}`));
}
module.exports = app;
