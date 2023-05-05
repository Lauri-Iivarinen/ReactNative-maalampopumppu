import { Card} from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React, {useState, useEffect} from "react";
import { View, Text, RefreshControl, ScrollView  } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { styles } from "../util/stylesheet";
import Icon from "react-native-vector-icons/Ionicons";
import { fetchOfflineData, fetchWithIp } from "../util/fetch";
import { PumpCodes } from "../types/types";
import { getFrontPageValue } from "../util/util";

export default function HomeScreenData() {

    const [data, setData] = useState<PumpCodes[]>([])
    const filteredNames = ['Heat set 1', 'Radiator Return', 'Compressor  0W', 'Alarm  0W']
    const [refreshing, setRefreshing] = useState(false);

    const filterFrontpage = (data: PumpCodes[]) => {
        const filtered = data.filter(item => {
            return filteredNames.includes(item.name)
        })
        setData(filtered)
    } 

    const doFetch = async () => {
        let fetchedData = fetchWithIp()
        filterFrontpage(await fetchedData)
    }

    useEffect(() => {
        //doFetch()
        setData(fetchOfflineData())
    }, [])

    const formatName = (name: string) => {
        switch (name) {
            case 'Heat set 1':
                return 'Heat curve'
            case 'Radiator return':
                return 'Radiator return'
            case 'Compressor  0W':
                return 'Compressor'
            case 'Alarm  0W':
                return 'Alarms'
            default:
                return name
        }
    }

    if (data.length < 4) {
        return (
            <SafeAreaProvider>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={doFetch}></RefreshControl>}
            >
                <View style={styles.centered}>
                        <Icon style={{ marginTop: 20 }} name="alert-circle-outline" size={40} color='red'></Icon>
                    <Text style={{marginTop: 20}}>Incorrect IP address or connection error, pull to refresh</Text>
                </View>
                </ScrollView>
            </SafeAreaProvider>
        )
    } else {
        return (
            <SafeAreaProvider>
                <LinearGradient
                    style={{flex: 1}}
                    colors={['rgb(200,100,100)','orange']}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 0 }}
                >
                    <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={doFetch}></RefreshControl>}
                    >
                        <View style={{alignItems: 'center', margin: 5}}>
                            <Text style={{ fontSize: 20, color: 'white' }}>Pump Details</Text>
                            <View style={{height: 1, backgroundColor: 'white', margin: 1, padding: 1, width: '100%'}}></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={styles.cardContent}><Icon name="git-commit-outline" size={30}></Icon><Text>{formatName(data[0].name)}</Text><Text>{getFrontPageValue(data[0].name, data[0].value, data[0].valueType!)}</Text></View>
                                <View style={styles.cardContent}><Icon name="repeat-outline" size={30}></Icon><Text>{formatName(data[1].name)}</Text><Text>{getFrontPageValue(data[1].name, data[1].value, data[1].valueType!)}</Text></View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={styles.cardContent}><Icon name="toggle-outline" size={30}></Icon><Text>{formatName(data[2].name)}</Text><Text>{getFrontPageValue(data[2].name, data[2].value, data[2].valueType!)}</Text></View>
                                <View style={styles.cardContent}><Icon name="megaphone-outline" size={30}></Icon><Text>{formatName(data[3].name)}</Text><Text>{getFrontPageValue(data[3].name, data[3].value, data[3].valueType!)}</Text></View>
                            </View>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </SafeAreaProvider>
    
        )
    }
    
}