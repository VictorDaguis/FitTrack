import React from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { COLORS } from '../components/UI';
import {
  ExercisesScreen,
  FitnessHomeScreen,
  HistoryScreen,
  WorkoutsScreen,
} from '../screens/FitnessScreens';
import {
  AboutSupportScreen,
  ContactsScreen,
  IncidentsScreen,
  SOSScreen,
  SupportHomeScreen,
  SupportPointsScreen,
} from '../screens/SupportScreens';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabIcon({ children, focused }) {
  return <Text style={{ fontSize: 18, opacity: focused ? 1 : 0.66 }}>{children}</Text>;
}

function FitnessTabs() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: COLORS.navy,
      tabBarInactiveTintColor: '#8490A0',
      tabBarStyle: { backgroundColor: '#FFFFFF', borderTopColor: '#DCE3ED', height: 62, paddingTop: 6, paddingBottom: 6 },
      tabBarLabelStyle: { fontSize: 10, fontWeight: '700' },
    }}>
      <Tab.Screen name="Início" component={FitnessHomeScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon focused={focused}>🏠</TabIcon> }} />
      <Tab.Screen name="Treinos" component={WorkoutsScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon focused={focused}>🏋️</TabIcon> }} />
      <Tab.Screen name="Exercícios" component={ExercisesScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon focused={focused}>💪</TabIcon> }} />
      <Tab.Screen name="Histórico" component={HistoryScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon focused={focused}>📈</TabIcon> }} />
    </Tab.Navigator>
  );
}

function SupportDrawer() {
  return (
    <Drawer.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#EAF5ED' },
      headerTintColor: COLORS.green,
      headerTitleStyle: { fontWeight: '800', fontSize: 16 },
      headerTitle: 'Área de Apoio',
      drawerActiveTintColor: COLORS.green,
      drawerActiveBackgroundColor: '#EAF5ED',
      drawerLabelStyle: { fontSize: 13, fontWeight: '700' },
      drawerStyle: { backgroundColor: '#FFFFFF', width: 300 },
    }}>
      <Drawer.Screen name="Central de apoio" component={SupportHomeScreen} options={{ drawerLabel: 'Início da área de apoio', drawerIcon: () => <Text>🛡️</Text> }} />
      <Drawer.Screen name="Contatos" component={ContactsScreen} options={{ drawerIcon: () => <Text>👥</Text> }} />
      <Drawer.Screen name="Ocorrências" component={IncidentsScreen} options={{ drawerIcon: () => <Text>📝</Text> }} />
      <Drawer.Screen name="Pontos de apoio" component={SupportPointsScreen} options={{ drawerIcon: () => <Text>📍</Text> }} />
      <Drawer.Screen name="SOS" component={SOSScreen} options={{ drawerIcon: () => <Text>🆘</Text>, drawerLabelStyle: { color: COLORS.red, fontWeight: '900' } }} />
      <Drawer.Screen name="Sobre o projeto" component={AboutSupportScreen} options={{ drawerIcon: () => <Text>ℹ️</Text> }} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <RootStack.Navigator initialRouteName="Fitness" screenOptions={{ headerShown: false, animation: 'fade' }}>
      <RootStack.Screen name="Fitness" component={FitnessTabs} />
      <RootStack.Screen name="Support" component={SupportDrawer} />
    </RootStack.Navigator>
  );
}
