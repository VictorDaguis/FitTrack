export const initialWorkouts = [
  { id: 'w1', name: 'Peito + Tríceps', focus: 'Força e hipertrofia', duration: 45, day: 'Hoje' },
  { id: 'w2', name: 'Costas + Bíceps', focus: 'Força e postura', duration: 50, day: 'Quarta-feira' },
  { id: 'w3', name: 'Pernas', focus: 'Resistência', duration: 55, day: 'Sexta-feira' },
];

export const initialExercises = [
  { id: 'e1', name: 'Supino reto', sets: 4, reps: 10, load: '60 kg', workoutId: 'w1' },
  { id: 'e2', name: 'Crucifixo', sets: 3, reps: 12, load: '18 kg', workoutId: 'w1' },
  { id: 'e3', name: 'Tríceps pulley', sets: 3, reps: 12, load: '30 kg', workoutId: 'w1' },
  { id: 'e4', name: 'Elevação lateral', sets: 3, reps: 12, load: '10 kg', workoutId: 'w1' },
  { id: 'e5', name: 'Puxada alta', sets: 4, reps: 10, load: '45 kg', workoutId: 'w2' },
  { id: 'e6', name: 'Remada baixa', sets: 3, reps: 12, load: '40 kg', workoutId: 'w2' },
];

export const initialContacts = [
  { id: 'c1', name: 'Ana', relation: 'Mãe', phone: '(43) 99999-1111', priority: '1' },
  { id: 'c2', name: 'Carlos', relation: 'Irmão', phone: '(43) 99999-2222', priority: '2' },
  { id: 'c3', name: 'Marina', relation: 'Amiga', phone: '(43) 99999-3333', priority: '3' },
];

// Registros fictícios usados apenas para demonstrar a interface acadêmica.
export const initialIncidents = [
  { id: 'i1', date: '02/10/2026', type: 'Discussão / ameaça', description: 'Registro demonstrativo para teste.', severity: '3' },
  { id: 'i2', date: '29/09/2026', type: 'Dano a objeto', description: 'Registro fictício para validar a lista.', severity: '2' },
];

export const supportPoints = [
  { id: 'p1', name: 'Delegacia Especializada de Atendimento à Mulher', type: 'Segurança pública', detail: 'Consulte o endereço e o horário atualizados nos canais oficiais da sua cidade.' },
  { id: 'p2', name: 'Casa de acolhimento', type: 'Acolhimento', detail: 'Procure a rede municipal de assistência social para informações verificadas.' },
  { id: 'p3', name: 'CRAS / CREAS', type: 'Assistência social', detail: 'Confirme a unidade de atendimento mais próxima pelos canais oficiais do município.' },
];
