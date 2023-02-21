import React from 'react';
import { View, Text } from 'react-native';
import {styles} from '../styles/styles'

export default function Homepage({route, navigation}: any){

    const {theme} = route.params;

    return(
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Text>mmm</Text>
            </View>
            <View style={{flex: 1}}>
                <Text>HMM</Text>
            </View>
        </View>
    )
}