import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from './components/Homepage';
import React, {useState, useEffect} from 'react'
import {theme} from './types/types'
//import {styles} from './styles/styles'
import Settings from './components/Settings';
import { useColorScheme, StyleSheet } from 'react-native';


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
            component={Settings}
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
