import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from './components/Homepage';
import React, {useState, useEffect} from 'react'
import PumpConfig from './components/PumpConfig';
import { Text } from 'react-native';
import PumpStatus from './components/PumpStatus';
import PumpConfigSliders from './components/PumpConfigSliders';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from '@rneui/themed';
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from '@rneui/base';

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
    <SafeAreaProvider>
      <Header
      ViewComponent={LinearGradient} // Don't forget this!
      linearGradientProps={{
        colors: ['orange', 'rgb(200,100,100)'],
        start: { x: 0, y: 0.5 },
        end: { x: 0.5, y: 0.5 },
      }}
        leftComponent={<Icon name="menu"></Icon>}
        centerComponent={<Text style={{fontSize: 20}}>PumpApp</Text>}
        rightComponent={<Text>Ho</Text>}
      />
      <NavigationContainer>

        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Tasklist') {
                iconName = focused ? 'ios-list' : 'ios-list-outline';
              }
  
              // You can return any component that you like here!
              return <Icon name={'home'} size={size} color={color}/>;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
          })}
          initialRouteName='Homepage'>
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
      </SafeAreaProvider>
  );
}
