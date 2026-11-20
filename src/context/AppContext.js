import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { apiRequest, API_URL } from '../services/api';

const AppContext = createContext(null);
export function AppProvider({ children }) {
  const [data, setData] = useState({ workouts: [], exercises: [], contacts: [], incidents: [] });
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [connected, setConnected] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [workouts, exercises, contacts, incidents] = await Promise.all([
        apiRequest('/api/workouts'), apiRequest('/api/exercises'),
        apiRequest('/api/contacts'), apiRequest('/api/incidents'),
      ]);
      setData({ workouts, exercises, contacts, incidents });
      setConnected(true);
      setApiError(null);
    } catch (err) {
      setConnected(false);
      setApiError(err.message);
      throw err;
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { refresh().catch(() => {}); }, [refresh]);

  const mutate = useCallback(async (resource, method, id, payload) => {
    const path = `/api/${resource}${id == null ? '' : `/${id}`}`;
    const result = await apiRequest(path, method, payload);
    await refresh();
    return result;
  }, [refresh]);

  const value = useMemo(() => ({
    ...data, loading, connected, apiError, apiUrl: API_URL, refresh,
    addWorkout: (item) => mutate('workouts', 'POST', null, item),
    updateWorkout: (id, item) => mutate('workouts', 'PUT', id, item),
    deleteWorkout: (id) => mutate('workouts', 'DELETE', id),
    addExercise: (item) => mutate('exercises', 'POST', null, item),
    updateExercise: (id, item) => mutate('exercises', 'PUT', id, item),
    deleteExercise: (id) => mutate('exercises', 'DELETE', id),
    addContact: (item) => mutate('contacts', 'POST', null, item),
    updateContact: (id, item) => mutate('contacts', 'PUT', id, item),
    deleteContact: (id) => mutate('contacts', 'DELETE', id),
    addIncident: (item) => mutate('incidents', 'POST', null, item),
    updateIncident: (id, item) => mutate('incidents', 'PUT', id, item),
    deleteIncident: (id) => mutate('incidents', 'DELETE', id),
    sendDemoAlert: (coords) => apiRequest('/api/alerts', 'POST', coords),
  }), [data, loading, connected, apiError, refresh, mutate]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useAppData() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppData deve ser usado dentro de AppProvider');
  return context;
}
