// SQLite nativo do Node 22.16+; nenhum arquivo de banco de vitimas reais.
const { DatabaseSync } = require('node:sqlite');
const fs = require('node:fs');
const path = require('node:path');
const DATA_DIR = path.join(__dirname, 'data');
fs.mkdirSync(DATA_DIR, { recursive: true });
const filename = process.env.DB_FILE || path.join(DATA_DIR, 'fittrack.sqlite');
const db = new DatabaseSync(filename);
db.exec('PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;');
db.exec(`
CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY, name TEXT NOT NULL, demo INTEGER NOT NULL DEFAULT 1
);
CREATE TABLE IF NOT EXISTS workouts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profile_id INTEGER NOT NULL DEFAULT 1 REFERENCES profiles(id),
  name TEXT NOT NULL, focus TEXT NOT NULL, duration INTEGER NOT NULL CHECK(duration > 0),
  day TEXT NOT NULL DEFAULT 'Personalizado'
);
CREATE TABLE IF NOT EXISTS exercises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  workout_id INTEGER NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  name TEXT NOT NULL, sets INTEGER NOT NULL CHECK(sets > 0), reps INTEGER NOT NULL CHECK(reps > 0),
  load TEXT NOT NULL DEFAULT 'Não informada'
);
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profile_id INTEGER NOT NULL DEFAULT 1 REFERENCES profiles(id),
  name TEXT NOT NULL, relation TEXT NOT NULL, phone TEXT NOT NULL,
  priority INTEGER NOT NULL CHECK(priority BETWEEN 1 AND 5)
);
CREATE TABLE IF NOT EXISTS incidents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profile_id INTEGER NOT NULL DEFAULT 1 REFERENCES profiles(id),
  date TEXT NOT NULL, type TEXT NOT NULL, description TEXT NOT NULL,
  severity INTEGER NOT NULL CHECK(severity BETWEEN 1 AND 5)
);
CREATE TABLE IF NOT EXISTS sos_alerts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profile_id INTEGER NOT NULL REFERENCES profiles(id),
  latitude REAL NOT NULL CHECK(latitude BETWEEN -90 AND 90),
  longitude REAL NOT NULL CHECK(longitude BETWEEN -180 AND 180),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status TEXT NOT NULL DEFAULT 'novo' CHECK(status IN ('novo','em_atendimento','concluido'))
);
`);
if (!db.prepare('SELECT id FROM profiles WHERE id=1').get()) {
  db.prepare('INSERT INTO profiles(id,name,demo) VALUES (1,?,1)').run('Conta de teste FitTrack');
}
// Seed exclusivamente ficticio, aplicado apenas ao criar uma nova base vazia.
if (db.prepare('SELECT COUNT(*) AS n FROM workouts').get().n === 0) {
  const w = db.prepare('INSERT INTO workouts(profile_id,name,focus,duration,day) VALUES (1,?,?,?,?)');
  const wid = Number(w.run('Peito + Tríceps', 'Força e hipertrofia', 45, 'Hoje').lastInsertRowid);
  w.run('Costas + Bíceps', 'Resistência', 50, 'Quarta-feira');
  const e = db.prepare('INSERT INTO exercises(workout_id,name,sets,reps,load) VALUES (?,?,?,?,?)');
  e.run(wid, 'Supino reto', 4, 10, '60 kg');
  e.run(wid, 'Crucifixo', 3, 12, '18 kg');
}
if (db.prepare('SELECT COUNT(*) AS n FROM contacts').get().n === 0) {
  db.prepare('INSERT INTO contacts(profile_id,name,relation,phone,priority) VALUES (1,?,?,?,?)').run('Contato Fictício', 'Pessoa de confiança', '(00) 00000-0000', 1);
}
module.exports = { db, filename };
