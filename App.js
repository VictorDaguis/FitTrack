import 'react-native-gesture-handler';
import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
} from '@react-navigation/native';
import { StatusBar } from 'react-native';
import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';
import { AppProvider } from './src/context/AppContext';
import { COLORS } from './src/components/UI';

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.background,
    card: COLORS.white,
    text: COLORS.text,
    primary: COLORS.navy,
    border: COLORS.border,
  },
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppProvider>
          <NavigationContainer theme={navigationTheme}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor={COLORS.background}
            />
            <AppNavigator />
          </NavigationContainer>
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}