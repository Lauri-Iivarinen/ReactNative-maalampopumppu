import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
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
import PumpTab from './components/PumpTab';
import { styles } from './util/stylesheet';

export default function App() {
  

  const Tab = createMaterialBottomTabNavigator()
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
          style: styles.header
        }}
        leftComponent={<Icon name="menu" onPress={() => setOpen((prevOpen) => !prevOpen)}></Icon>}
        centerComponent={<Text style={[styles.textStyle,{fontSize: 20}]}>PumpApp</Text>}
        rightComponent={<Text></Text>}
      />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              let iconName;
  
              if (route.name === 'Homepage') {
                iconName = 'home'
              } else if (route.name === 'Quick setup') {
                iconName = 'tune'
              } else {
                iconName = 'info'
              }
              return <Icon name={iconName} color={color}/>;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
          })}
          initialRouteName='Homepage'
          activeColor="orange"
          inactiveColor="rgb(200,100,100)"
          barStyle={{ height: 70 }}
          shifting={true}>
          <Tab.Screen 
            name='Homepage' 
            component={Homepage}
            />
          <Tab.Screen 
            name='Quick setup'
            component={PumpConfigSliders} />
          <Tab.Screen 
            name="Pump"
            component={PumpTab}
          />
        </Tab.Navigator>
      </NavigationContainer>
      </Drawer>
      </SafeAreaProvider>
  );
}
