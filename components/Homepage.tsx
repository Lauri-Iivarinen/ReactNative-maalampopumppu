import React, {useEffect, useState} from 'react';
import { View, Text, Dimensions } from 'react-native';
import ElectricityPrice from './ElectricityPrice';
import WeatherReport from './WeatherReport';

export default function Homepage({ route, navigation }: any) {
    return(
        <View style={{flex: 1}}>
            <ElectricityPrice></ElectricityPrice>
            <WeatherReport></WeatherReport>
        </View>
    )
    
}
