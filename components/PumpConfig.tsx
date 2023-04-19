import React, {useEffect, useState} from 'react';
import { View, ScrollView, RefreshControl, FlatList } from 'react-native';
import {HOST} from '@env'
import { fetchOfflineData, fetchData, fetchWithIp } from '../util/fetch'
import { getKeywords} from '../util/util'
import { PumpCodes } from '../types/types';
import PumpDataListItem from './PumpDataListItem';
import { Snackbar } from "@react-native-material/core";
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../util/stylesheet';

export default function PumpConfig({ route, navigation }: any) {
    //idx-> ID, val -> VALUE, USE Promise.all()
    const POSTENDPOINT = 'http://' + HOST + 'api/set?idx=2204&val=220'
    const [data, setData] = useState<PumpCodes[]>([])
    const KEYWORDS = getKeywords('set')
    const [refreshing, setRefreshing] = useState(false)
    const [snackbarVisible, setSnackbarVisible] = useState(false)

    const doFetch = async () => {
        let fetchedData = fetchWithIp()
        setData(await fetchedData)
    }
    const toggleSnackbar = () => {
        setSnackbarVisible(true)
        setTimeout(() => setSnackbarVisible(false), 4000)
    }

    useEffect(() => {
        doFetch()
        //setData(fetchOfflineData())
    }, [])
    
    return (
        <LinearGradient
            style={styles.pumpListContainer}
            colors={['rgb(200,100,100)','orange']}
            start={{ x: 0, y: 0.6 }}
            end={{ x: 1, y: 1 }}
        >
            <FlatList
                data={KEYWORDS}
                renderItem={({ item }) => <PumpDataListItem props={{ data: data, keyword: item, keywordType: 'set', snackbar: toggleSnackbar }}></PumpDataListItem>}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={doFetch}></RefreshControl>}
            ></FlatList>
            {snackbarVisible
            &&<Snackbar
            message='Successfully updated'
            style={styles.snackbarStyle}
            ></Snackbar>}
        </LinearGradient>
    )
}
