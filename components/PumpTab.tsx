import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import PumpStatus from "./PumpStatus";
import PumpConfig from "./PumpConfig";
import { Icon } from "@rneui/themed";

export default function PumpTab(){

    const Tab = createBottomTabNavigator()

    return(
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Advanced') {
                iconName = 'settings'
              } else {
                iconName = 'list'
              }
              return <Icon name={iconName} size={size} color={color}/>;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
          })}
          initialRouteName='Pump Data'>
            <Tab.Screen
            name="Pump Data"
            component={PumpStatus}
        />
        <Tab.Screen 
            name='Advanced'
            component={PumpConfig} 
        />
        </Tab.Navigator>
    )
}