import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './screens/HomeScreen';
import UniverseScreen from './screens/UniverseScreen';
import ArmyScreen from './screens/ArmyScreen';
import UnitScreen from './screens/UnitScreen';
import UnitDetailsScreen from './screens/UnitDetailsScreen';


const Stack = createNativeStackNavigator()

export default function App() {

  


  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Universes" component={UniverseScreen} />
          <Stack.Screen name="Army" component={ArmyScreen} options={({route}) => ({title : route.params.name})} />
          <Stack.Screen name="Unit" component={UnitScreen} options={({route}) => ({title : route.params.name})} />
          <Stack.Screen name="UnitDetails" component={UnitDetailsScreen} /> 
        </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
};
