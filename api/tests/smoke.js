const assert = require('node:assert/strict');
const base = process.env.API_TEST_URL || 'http://localhost:3333';
async function call(route,method='GET',body,expected=200){
 const r=await fetch(base+route,{method,headers:{'Content-Type':'application/json'},...(body===undefined?{}:{body:JSON.stringify(body)})});
 const json=r.status===204?null:await r.json();
 assert.equal(r.status,expected,`${method} ${route} -> ${r.status} ${JSON.stringify(json)}`);return json;
}
async function main(){
 console.log('1/9 API health'); await call('/api/health');
 console.log('2/9 CREATE + GET + UPDATE treinos');
 const w=await call('/api/workouts','POST',{name:'Treino de teste automatizado',focus:'Teste',duration:35,day:'Hoje'},201);
 await call('/api/workouts/'+w.id); await call('/api/workouts/'+w.id,'PUT',{name:'Treino de teste alterado'});
 console.log('3/9 CREATE + READ + UPDATE exercícios vinculados');
 const e=await call('/api/exercises','POST',{name:'Exercicio teste',sets:3,reps:8,load:'5 kg',workoutId:w.id},201);
 assert.equal(e.workoutId,w.id);
 await call('/api/exercises/'+e.id,'PUT',{load:'10 kg'});
 console.log('4/9 Validação de FK');
 await call('/api/exercises','POST',{name:'Invalido',sets:3,reps:8,load:'5 kg',workoutId:99999999},422);
 console.log('5/9 CRUD de contatos');
 const c=await call('/api/contacts','POST',{name:'Contato de Teste',relation:'Amiga',phone:'(00) 00000-0000',priority:1},201);
 await call('/api/contacts/'+c.id); await call('/api/contacts/'+c.id,'PUT',{priority:2}); await call('/api/contacts/'+c.id,'DELETE',undefined,204);
 console.log('6/9 CRUD completo de ocorrências (Luhan)');
 const i=await call('/api/incidents','POST',{date:'19/11/2026',type:'Simulacao',description:'Teste automatizado ficticio',severity:1},201);
 assert.ok(Number.isInteger(i.id) && i.id > 0);
 let incident=await call('/api/incidents/'+i.id);
 assert.equal(incident.type,'Simulacao');
 const incidents=await call('/api/incidents');
 assert.ok(incidents.some(item => item.id===i.id));
 incident=await call('/api/incidents/'+i.id,'PUT',{severity:2,description:'Registro ficticio atualizado'});
 assert.equal(incident.severity,2);
 assert.equal(incident.description,'Registro ficticio atualizado');
 await call('/api/incidents','POST',{date:'19/11/2026',type:'Invalido',description:'Teste',severity:9},422);
 await call('/api/incidents/'+i.id,'DELETE',undefined,204);
 await call('/api/incidents/'+i.id,'GET',undefined,404);
 console.log('   POST/GET/list/PUT/DELETE + validacao 422: OK');
 console.log('7/9 DELETE do treino + cascata'); await call('/api/workouts/'+w.id,'DELETE',undefined,204); await call('/api/exercises/'+e.id,'GET',undefined,404);
 console.log('8/9 SOS de demonstracao e status');
 const a=await call('/api/alerts','POST',{latitude:0,longitude:0},201);
 await call('/api/alerts/'+a.id+'/status','PATCH',{status:'em_atendimento'});
 console.log('9/9 Painel');let r=await fetch(base+'/painel');assert.equal(r.status,200);assert.match(await r.text(),/Painel de Alertas/);
 console.log('OK: Todos os testes HTTP passaram.');
}
main().catch(err=>{console.error('FALHA:',err);process.exitCode=1});
