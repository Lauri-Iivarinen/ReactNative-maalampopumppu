import React from 'react';
import { View, Text, Button } from 'react-native';
import {HOST} from '@env'

export default function PumpConfig({ route, navigation }: any) {
    
    //idx-> ID, val -> VALUE
    const POSTENDPOINT = 'http://' + HOST + 'api/set?idx=2204&val=220'

    return(
        <View style={{flex: 1}}>
            <Text style={{}}>Change pump settings</Text>
        </View>
    )
}