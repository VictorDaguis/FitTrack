const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fittrack-db-test-'));
process.env.DB_FILE = path.join(tmp, 'test.sqlite');
const { db } = require('../db');

test('semente fictícia e estrutura SQLite', () => {
  assert.equal(db.prepare('SELECT demo FROM profiles WHERE id=1').get().demo, 1);
  assert.ok(db.prepare('SELECT COUNT(*) AS n FROM workouts').get().n >= 1);
});
test('relacionamento real exercises.workout_id -> workouts.id e cascata', () => {
  const id = Number(db.prepare("INSERT INTO workouts(name,focus,duration,day) VALUES ('Teste completo','Teste',40,'Hoje')").run().lastInsertRowid);
  const e = Number(db.prepare("INSERT INTO exercises(workout_id,name,sets,reps,load) VALUES (?, 'Exercício de teste',3,10,'5 kg')").run(id).lastInsertRowid);
  assert.equal(db.prepare('SELECT workout_id FROM exercises WHERE id=?').get(e).workout_id, id);
  assert.throws(() => db.prepare("INSERT INTO exercises(workout_id,name,sets,reps,load) VALUES (99999999,'Inválido',3,10,'0 kg')").run());
  db.prepare('DELETE FROM workouts WHERE id=?').run(id);
  assert.equal(db.prepare('SELECT id FROM exercises WHERE id=?').get(e), undefined);
});
test('banco persistido em arquivo', () => {
  assert.ok(fs.statSync(process.env.DB_FILE).size > 1000);
});


test('quarto CRUD: ocorrencias possuem tabela e validacao SQLite reais', () => {
  const insert = db.prepare('INSERT INTO incidents(profile_id,date,type,description,severity) VALUES (1,?,?,?,?)');
  const id = Number(insert.run('19/11/2026', 'Exemplo academico', 'Registro de teste ficticio', 2).lastInsertRowid);
  const row = db.prepare('SELECT id,date,type,description,severity FROM incidents WHERE id=?').get(id);
  assert.equal(row.type, 'Exemplo academico');
  assert.equal(row.severity, 2);
  assert.throws(() => insert.run('19/11/2026', 'Invalido', 'Nao deve entrar', 9));
  db.prepare('UPDATE incidents SET severity=4 WHERE id=?').run(id);
  assert.equal(db.prepare('SELECT severity FROM incidents WHERE id=?').get(id).severity, 4);
  db.prepare('DELETE FROM incidents WHERE id=?').run(id);
  assert.equal(db.prepare('SELECT id FROM incidents WHERE id=?').get(id), undefined);
});
