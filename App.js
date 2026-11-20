import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar, Pressable, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { AppProvider, useAppData } from './src/context/AppContext';
import { COLORS } from './src/components/UI';

const theme = { ...DefaultTheme, colors: {
  ...DefaultTheme.colors, background: COLORS.background, card: COLORS.white,
  text: COLORS.text, primary: COLORS.navy, border: COLORS.border,
}};
function ApiBanner() {
  const { connected, loading, apiError, apiUrl, refresh } = useAppData();
  if (connected) return null;
  return <View style={{ backgroundColor: '#FFF2E0', paddingVertical: 7, paddingHorizontal: 14 }}>
    <Text style={{ color: '#775011', fontWeight: '700', fontSize: 11 }}>
      {loading ? 'Conectando ao servidor...' : `API desconectada: ${apiError || 'sem resposta'}`}
    </Text>
    {!loading && <Pressable onPress={() => refresh().catch(() => {})}>
      <Text style={{ color: COLORS.navy, fontSize: 11, fontWeight: '800' }}>TENTAR NOVAMENTE · {apiUrl}</Text>
    </Pressable>}
  </View>;
}
export default function App() {
  return <GestureHandlerRootView style={{ flex: 1 }}><SafeAreaProvider><AppProvider>
    <NavigationContainer theme={theme}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={{ flex: 1 }}><ApiBanner/><AppNavigator/></View>
    </NavigationContainer>
  </AppProvider></SafeAreaProvider></GestureHandlerRootView>;
}
