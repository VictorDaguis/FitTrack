import React, { useMemo, useRef, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { useAppData } from '../context/AppContext';
import { Card, COLORS, EmptyState, Field, FormModal, Pill, PrimaryButton, Screen, SectionTitle, SecondaryAction } from '../components/UI';

export function FitnessHomeScreen({ navigation }) {
  const longPressTriggered = useRef(false);
  const { workouts, exercises } = useAppData();
  const featured = workouts[0];
  const featuredExercises = exercises.filter((exercise) => exercise.workoutId === featured?.id);

  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ color: COLORS.navy, fontSize: 28, fontWeight: '900' }}>FitTrack</Text>
          <Text style={{ color: COLORS.muted, fontSize: 13 }}>Treino e progresso</Text>
        </View>
        <View style={{ width: 42, height: 42, borderRadius: 22, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: COLORS.blue, fontWeight: '900', fontSize: 17 }}>V</Text>
        </View>
      </View>

      <SectionTitle>TREINO DE HOJE</SectionTitle>
      <Card style={{ backgroundColor: '#F9FBFE', padding: 17 }}>
        <Text style={{ color: COLORS.text, fontSize: 21, fontWeight: '800' }}>{featured?.name || 'Seu treino'}</Text>
        <Text style={{ color: COLORS.muted, fontSize: 13 }}>{featuredExercises.length || 0} exercícios  •  ~{featured?.duration || 45} min</Text>
        <Text style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>{featured?.focus || 'Treino planejado para hoje'}</Text>
        <PrimaryButton
          title="INICIAR TREINO"
          onPressIn={() => { longPressTriggered.current = false; }}
          onPress={() => { if (!longPressTriggered.current) navigation.navigate('Treinos'); }}
          onLongPress={() => { longPressTriggered.current = true; navigation.navigate('Support'); }}
          delayLongPress={3000}
          style={{ marginTop: 5 }}
        />
      </Card>

      <SectionTitle>PROGRESSO SEMANAL</SectionTitle>
      <Card>
        <View style={{ height: 10, backgroundColor: '#DDE6F3', borderRadius: 10, overflow: 'hidden' }}>
          <View style={{ width: '80%', height: '100%', borderRadius: 10, backgroundColor: COLORS.blue }} />
        </View>
        <Text style={{ color: COLORS.muted, fontSize: 12 }}>4 de 5 treinos planejados • 80%</Text>
      </Card>

      <SectionTitle>ÚLTIMOS TREINOS</SectionTitle>
      <Card>
        <Text style={{ color: COLORS.text, fontWeight: '700' }}>SEG • Peito + Tríceps</Text>
        <Text style={{ color: COLORS.muted, fontSize: 12 }}>45 minutos • Concluído</Text>
      </Card>
      <Card>
        <Text style={{ color: COLORS.text, fontWeight: '700' }}>QUA • Costas + Bíceps</Text>
        <Text style={{ color: COLORS.muted, fontSize: 12 }}>50 minutos • Concluído</Text>
      </Card>
      <Text style={{ color: '#9AA3AF', fontSize: 10, textAlign: 'center', marginTop: 4 }}>Toque em “Iniciar treino” para abrir os treinos.</Text>
    </Screen>
  );
}

export function WorkoutsScreen({ navigation }) {
  const { workouts, exercises, addWorkout, updateWorkout, deleteWorkout } = useAppData();
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState('');
  const [focus, setFocus] = useState('');
  const [duration, setDuration] = useState('45');

  const openForm = (workout = null) => {
    setEditing(workout);
    setName(workout?.name || '');
    setFocus(workout?.focus || '');
    setDuration(String(workout?.duration || '45'));
    setModalVisible(true);
  };
  const save = () => {
    if (!name.trim()) return Alert.alert('Campo obrigatório', 'Informe o nome do treino.');
    const data = { name: name.trim(), focus: focus.trim() || 'Treino geral', duration: Math.max(1, Number(duration) || 45), day: 'Personalizado' };
    if (editing) updateWorkout(editing.id, data); else addWorkout(data);
    setModalVisible(false);
  };
  const confirmDelete = (workout) => Alert.alert('Excluir treino?', `O treino “${workout.name}” e seus exercícios vinculados serão removidos dos dados simulados.`, [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Excluir', style: 'destructive', onPress: () => deleteWorkout(workout.id) },
  ]);

  return (
    <Screen>
      <View style={{ gap: 4 }}>
        <Text style={{ color: COLORS.text, fontSize: 25, fontWeight: '900' }}>Meus treinos</Text>
        <Text style={{ color: COLORS.muted, fontSize: 13 }}>Organize sua rotina de exercícios.</Text>
      </View>
      <PrimaryButton title="+ NOVO TREINO" onPress={() => openForm()} />
      {workouts.length === 0 ? <EmptyState text="Nenhum treino cadastrado. Crie o primeiro treino." /> : workouts.map((workout) => {
        const count = exercises.filter((exercise) => exercise.workoutId === workout.id).length;
        return (
          <Card key={workout.id}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={{ fontSize: 17, fontWeight: '800', color: COLORS.text }}>{workout.name}</Text>
                <Text style={{ color: COLORS.muted, fontSize: 12 }}>{workout.focus}</Text>
                <Text style={{ color: COLORS.muted, fontSize: 12 }}>{count} exercícios • {workout.duration} min • {workout.day}</Text>
              </View>
              <Pill>{count} exercícios</Pill>
            </View>
            <PrimaryButton title="VER EXERCÍCIOS" compact tone="light" onPress={() => navigation.navigate('Exercícios', { workoutId: workout.id })} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <SecondaryAction title="Editar" onPress={() => openForm(workout)} />
              <SecondaryAction title="Excluir" danger onPress={() => confirmDelete(workout)} />
            </View>
          </Card>
        );
      })}
      <FormModal visible={modalVisible} title={editing ? 'Editar treino' : 'Novo treino'} onCancel={() => setModalVisible(false)} onSave={save}>
        <Field label="Nome do treino" value={name} onChangeText={setName} placeholder="Ex.: Peito + Tríceps" />
        <Field label="Objetivo / foco" value={focus} onChangeText={setFocus} placeholder="Ex.: Força e hipertrofia" />
        <Field label="Duração estimada (minutos)" value={duration} onChangeText={setDuration} keyboardType="numeric" />
      </FormModal>
    </Screen>
  );
}

export function ExercisesScreen({ route }) {
  const { workouts, exercises, addExercise, updateExercise, deleteExercise } = useAppData();
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState('');
  const [sets, setSets] = useState('3');
  const [reps, setReps] = useState('12');
  const [load, setLoad] = useState('');
  const [workoutId, setWorkoutId] = useState(route.params?.workoutId || workouts[0]?.id || '');
  const selectedWorkoutId = route.params?.workoutId;
  const visibleExercises = useMemo(() => selectedWorkoutId ? exercises.filter((item) => item.workoutId === selectedWorkoutId) : exercises, [exercises, selectedWorkoutId]);

  const openForm = (exercise = null) => {
    setEditing(exercise);
    setName(exercise?.name || '');
    setSets(String(exercise?.sets || '3'));
    setReps(String(exercise?.reps || '12'));
    setLoad(exercise?.load || '');
    setWorkoutId(exercise?.workoutId || selectedWorkoutId || workouts[0]?.id || '');
    setModalVisible(true);
  };
  const save = () => {
    if (!name.trim()) return Alert.alert('Campo obrigatório', 'Informe o nome do exercício.');
    if (!workoutId) return Alert.alert('Treino obrigatório', 'Cadastre um treino antes de criar exercícios.');
    const data = { name: name.trim(), sets: Math.max(1, Number(sets) || 1), reps: Math.max(1, Number(reps) || 1), load: load.trim() || 'Não informada', workoutId };
    if (editing) updateExercise(editing.id, data); else addExercise(data);
    setModalVisible(false);
  };
  const confirmDelete = (exercise) => Alert.alert('Excluir exercício?', `Deseja remover “${exercise.name}” dos dados simulados?`, [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Excluir', style: 'destructive', onPress: () => deleteExercise(exercise.id) },
  ]);

  return (
    <Screen>
      <View style={{ gap: 4 }}>
        <Text style={{ color: COLORS.text, fontSize: 25, fontWeight: '900' }}>Exercícios</Text>
        <Text style={{ color: COLORS.muted, fontSize: 13 }}>{selectedWorkoutId ? `Exercícios de ${workouts.find((w) => w.id === selectedWorkoutId)?.name || 'treino selecionado'}` : 'Lista vinculada aos seus treinos.'}</Text>
      </View>
      <PrimaryButton title="+ NOVO EXERCÍCIO" onPress={() => openForm()} />
      {visibleExercises.length === 0 ? <EmptyState text="Nenhum exercício encontrado para este filtro." /> : visibleExercises.map((exercise) => {
        const workout = workouts.find((item) => item.id === exercise.workoutId);
        return (
          <Card key={exercise.id}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={{ color: COLORS.text, fontWeight: '800', fontSize: 16 }}>{exercise.name}</Text>
                <Text style={{ color: COLORS.muted, fontSize: 12 }}>{exercise.sets} séries × {exercise.reps} repetições</Text>
                <Text style={{ color: COLORS.blue, fontSize: 12, fontWeight: '700' }}>{exercise.load}</Text>
                <Text style={{ color: COLORS.muted, fontSize: 11 }}>Treino: {workout?.name || 'Não vinculado'}</Text>
              </View>
              <View style={{ justifyContent: 'space-around', alignItems: 'flex-end' }}>
                <SecondaryAction title="Editar" onPress={() => openForm(exercise)} />
                <SecondaryAction title="Excluir" danger onPress={() => confirmDelete(exercise)} />
              </View>
            </View>
          </Card>
        );
      })}
      <FormModal visible={modalVisible} title={editing ? 'Editar exercício' : 'Novo exercício'} onCancel={() => setModalVisible(false)} onSave={save}>
        <Field label="Nome do exercício" value={name} onChangeText={setName} placeholder="Ex.: Supino reto" />
        <Field label="Número de séries" value={sets} onChangeText={setSets} keyboardType="numeric" />
        <Field label="Repetições por série" value={reps} onChangeText={setReps} keyboardType="numeric" />
        <Field label="Carga" value={load} onChangeText={setLoad} placeholder="Ex.: 20 kg" />
        <Text style={{ color: COLORS.text, fontSize: 12, fontWeight: '700', marginBottom: 8 }}>Vincular ao treino:</Text>
        <View style={{ gap: 8, marginBottom: 12 }}>
          {workouts.map((workout) => (
            <Pressable key={workout.id} onPress={() => setWorkoutId(workout.id)} style={{ padding: 11, borderRadius: 9, borderWidth: 1, borderColor: workoutId === workout.id ? COLORS.green : COLORS.border, backgroundColor: workoutId === workout.id ? '#E8F5EC' : COLORS.white }}>
              <Text style={{ color: COLORS.text, fontWeight: workoutId === workout.id ? '800' : '500' }}>{workout.name}{workoutId === workout.id ? '  ✓' : ''}</Text>
            </Pressable>
          ))}
        </View>
      </FormModal>
    </Screen>
  );
}

export function HistoryScreen() {
  const records = [
    { id: 'h1', day: 'SEG • 19/10', workout: 'Peito + Tríceps', duration: '45 min', result: 'Concluído' },
    { id: 'h2', day: 'QUA • 21/10', workout: 'Costas + Bíceps', duration: '50 min', result: 'Concluído' },
    { id: 'h3', day: 'SEX • 23/10', workout: 'Pernas', duration: '48 min', result: 'Concluído' },
  ];
  return (
    <Screen>
      <Text style={{ color: COLORS.text, fontSize: 25, fontWeight: '900' }}>Histórico</Text>
      <Text style={{ color: COLORS.muted, fontSize: 13 }}>Resumo de atividade demonstrativo.</Text>
      {records.map((record) => (
        <Card key={record.id} accent={COLORS.blue}>
          <Text style={{ color: COLORS.muted, fontSize: 11, fontWeight: '700' }}>{record.day}</Text>
          <Text style={{ color: COLORS.text, fontSize: 17, fontWeight: '800' }}>{record.workout}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: COLORS.muted, fontSize: 12 }}>{record.duration}</Text>
            <Pill tone="green">{record.result}</Pill>
          </View>
        </Card>
      ))}
      <Card style={{ backgroundColor: COLORS.paleBlue }}>
        <Text style={{ fontWeight: '800', color: COLORS.navy }}>Resumo da semana</Text>
        <Text style={{ color: COLORS.muted, fontSize: 13 }}>3 treinos concluídos • 2h23min de atividade</Text>
      </Card>
    </Screen>
  );
}
