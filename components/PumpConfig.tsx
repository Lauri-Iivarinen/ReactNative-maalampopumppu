import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import {HOST} from '@env'
import { fetchOfflineData, fetchData } from '../util/fetch'
import { getKeywords} from '../util/util'
import { PumpCodes } from '../types/types';
import PumpDataListItem from './PumpDataListItem';

export default function PumpConfig({ route, navigation }: any) {

    const [data, setData] = useState<PumpCodes[]>([])
    const KEYWORDS = getKeywords('set')
    //console.log(keywords)
    
    //idx-> ID, val -> VALUE
    const POSTENDPOINT = 'http://' + HOST + 'api/set?idx=2204&val=220'

    const doFetch = async () => {
        let fetchedData = fetchData()
        setData(await fetchedData)
    }

    useEffect(() => {
        doFetch()
        //setData(fetchOfflineData())
    }, [])

    return(
        <View style={{flex: 1}}>
            {KEYWORDS.map((keyword, index) => {
                return (
                    <PumpDataListItem key={index} props={{ data: data, keyword: keyword }} />
                )
            })}
        </View>
    )
}