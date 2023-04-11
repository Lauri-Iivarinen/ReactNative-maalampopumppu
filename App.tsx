import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from './components/Homepage';
import React, {useState, useEffect} from 'react'
import PumpConfig from './components/PumpConfig';
import { Button, Text, View } from 'react-native';
import PumpStatus from './components/PumpStatus';
import PumpConfigSliders from './components/PumpConfigSliders';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from '@rneui/themed';
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from '@rneui/base';
import { Drawer } from 'react-native-drawer-layout';
import DrawerScreen from './components/DrawerScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WEATHER_API_KEY } from '@env';

export default function App() {
  

  const Tab = createBottomTabNavigator()
  const [open, setOpen] = useState(false)
 
  return (
    <SafeAreaProvider>
      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        renderDrawerContent={() => <DrawerScreen ></DrawerScreen>}
      >
      <Header
        ViewComponent={LinearGradient} // Don't forget this!
        linearGradientProps={{
          colors: ['orange', 'rgb(200,100,100)'],
          start: { x: 0, y: 0.5 },
          end: { x: 0.5, y: 0.5 },
          style: {padding: 10, borderWidth: 1, borderColor: 'black'}
        }}
        leftComponent={<Icon name="menu" onPress={() => setOpen((prevOpen) => !prevOpen)}></Icon>}
        centerComponent={<Text style={{fontSize: 20}}>PumpApp</Text>}
        rightComponent={<Text></Text>}
      />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Homepage') {
                iconName = 'home'
              } else if (route.name === 'Advanced configs') {
                iconName = 'settings'
              } else if (route.name === 'Quick configs') {
                iconName = 'tune'
              } else {
                iconName = 'info'
              }
              return <Icon name={iconName} size={size} color={color}/>;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
          })}
          initialRouteName='Homepage'>
          <Tab.Screen 
            name='Homepage' 
            component={Homepage}
            />
          <Tab.Screen 
            name='Quick configs'
            component={PumpConfigSliders} />
          <Tab.Screen 
            name='Advanced configs'
            component={PumpConfig} />
          <Tab.Screen
            name="Pump Data"
            component={PumpStatus}
          />
        </Tab.Navigator>
      </NavigationContainer>
      </Drawer>
      </SafeAreaProvider>
  );
}
