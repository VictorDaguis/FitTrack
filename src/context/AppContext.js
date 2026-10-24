import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  initialContacts,
  initialExercises,
  initialIncidents,
  initialWorkouts,
} from '../data/initialData';

const AppContext = createContext(null);
const newId = (prefix) => `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;

export function AppProvider({ children }) {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [exercises, setExercises] = useState(initialExercises);
  const [contacts, setContacts] = useState(initialContacts);
  const [incidents, setIncidents] = useState(initialIncidents);

  const value = useMemo(() => ({
    workouts,
    exercises,
    contacts,
    incidents,
    addWorkout: (data) => setWorkouts((items) => [...items, { ...data, id: newId('w') }]),
    updateWorkout: (id, data) => setWorkouts((items) => items.map((item) => item.id === id ? { ...item, ...data } : item)),
    deleteWorkout: (id) => {
      setWorkouts((items) => items.filter((item) => item.id !== id));
      setExercises((items) => items.filter((item) => item.workoutId !== id));
    },
    addExercise: (data) => setExercises((items) => [...items, { ...data, id: newId('e') }]),
    updateExercise: (id, data) => setExercises((items) => items.map((item) => item.id === id ? { ...item, ...data } : item)),
    deleteExercise: (id) => setExercises((items) => items.filter((item) => item.id !== id)),
    addContact: (data) => setContacts((items) => [...items, { ...data, id: newId('c') }]),
    updateContact: (id, data) => setContacts((items) => items.map((item) => item.id === id ? { ...item, ...data } : item)),
    deleteContact: (id) => setContacts((items) => items.filter((item) => item.id !== id)),
    addIncident: (data) => setIncidents((items) => [{ ...data, id: newId('i') }, ...items]),
    updateIncident: (id, data) => setIncidents((items) => items.map((item) => item.id === id ? { ...item, ...data } : item)),
    deleteIncident: (id) => setIncidents((items) => items.filter((item) => item.id !== id)),
  }), [workouts, exercises, contacts, incidents]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppData deve ser usado dentro de AppProvider.');
  return context;
}
