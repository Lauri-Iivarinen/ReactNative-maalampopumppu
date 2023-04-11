import React, {useEffect, useState} from 'react';
import { View, ScrollView, RefreshControl, FlatList } from 'react-native';
import {HOST} from '@env'
import { fetchOfflineData, fetchData, fetchWithIp } from '../util/fetch'
import { getKeywords} from '../util/util'
import { PumpCodes } from '../types/types';
import PumpDataListItem from './PumpDataListItem';

export default function PumpConfig({ route, navigation }: any) {
    //idx-> ID, val -> VALUE, USE Promise.all()
    const POSTENDPOINT = 'http://' + HOST + 'api/set?idx=2204&val=220'
    const [data, setData] = useState<PumpCodes[]>([])
    const KEYWORDS = getKeywords('set')
    const [refreshing, setRefreshing] = useState(false)

    const doFetch = async () => {
        let fetchedData = fetchWithIp()
        setData(await fetchedData)
    }

    useEffect(() => {
        doFetch()
        //setData(fetchOfflineData())
    }, [])
    
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={KEYWORDS}
                renderItem={({ item }) => <PumpDataListItem props={{ data: data, keyword: item }}></PumpDataListItem>}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={doFetch}></RefreshControl>}
            ></FlatList>
        </View>
    )
}
