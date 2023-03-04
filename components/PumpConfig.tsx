import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
import {HOST} from '@env'
import { fetchOfflineData, fetchData } from '../util/fetch'
import {CODES} from '../util/util'
import { PumpCodes } from '../types/types';
import PumpDataListItem from './PumpDataListItem';

export default function PumpConfig({ route, navigation }: any) {

    const [data, setData] = useState<PumpCodes[]>([])
    const dupes: string[] = []
    const keywords = CODES.filter(code => code.valueType.includes('Set ')).map(code => code.valueType).filter(keyword => {
        if (dupes.includes(keyword)) {
            return false
        }
        dupes.push(keyword)
        return true
    })
    console.log(keywords)
    
    //idx-> ID, val -> VALUE
    const POSTENDPOINT = 'http://' + HOST + 'api/set?idx=2204&val=220'
    useEffect(() => {
        //setData(fetchData())
        setData(fetchOfflineData())
    }, [])

    return(
        <View style={{flex: 1}}>
            {keywords.map((keyword, index) => {
                return (
                    <PumpDataListItem key={index} props={{ data: data, keyword: keyword }} />
                )
            })}
        </View>
    )
}