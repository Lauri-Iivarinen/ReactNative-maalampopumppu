import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from './components/Homepage';
import React, {useState, useEffect} from 'react'
import {theme} from './types/types'
//import {styles} from './styles/styles'
import PumpConfig from './components/PumpConfig';
import { useColorScheme, StyleSheet } from 'react-native';
import PumpStatus from './components/PumpStatus';
import PumpConfigSliders from './components/PumpConfigSliders';


export default function App() {
  /*
  //Create theme based on phones settings
  const scheme = useColorScheme()
  const styles = StyleSheet.create({
    main: {
        color: scheme === 'light' ? '#fff' : '#000',
        backgroundColor: scheme === 'light' ? '#fff': '#000'
    }
  })
  const [theme, setTheme] = useState(styles.main)
  console.log(scheme)
  */
  const Tab = createBottomTabNavigator()

  return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName='Homepage'>
          <Tab.Screen 
            name='Homepage' 
            component={Homepage} 
            initialParams={{}/*{theme: theme}*/} />
          <Tab.Screen 
            name='Configurations'
            component={PumpConfig} />
        <Tab.Screen 
            name='Sliders'
            component={PumpConfigSliders} />
          <Tab.Screen
            name="Pump Data"
            component={PumpStatus}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
