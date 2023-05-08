import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import { WEATHER_API_KEY } from '@env'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button, Icon } from '@rneui/themed'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { styles } from '../util/stylesheet'
import { RefreshControl } from 'react-native'

export default function WeatherReport({route, navigation}: any){

    const [status, setStatus] = useState(true)
    const [filtered, setFiltered] = useState<any[]>()
    const [refreshing, setRefreshing] = useState(false);

    const getDay = (str: string) => {
        const [date, time] = str.split(' ')
        const [year,month,day] = date.split('-')
        return day
    }

    //Split days from raw data into string[]
    const getDifferentDays = (weather: any[]) => {
        const days: string[] = [] 
        weather.forEach(item => {
            const day = getDay(item.dt_txt)
            if(!days.includes(day)) days.push(day)
        })

        return days
    }

    //Filter raw list of hours and weather data into seperate days
    const filterWeathers = (weather: any[]) => {
        const days = getDifferentDays(weather)
        const reportsForDays: any[] = []
        days.forEach(dayNum => {
            const filtered = weather.filter(item => getDay(item.dt_txt) === dayNum)
            reportsForDays.push(filtered)

        })
        setFiltered(reportsForDays.slice(0,3))
        setStatus(true)
    }

    //Fetch data based on lat,long saved in async storage
    const fetchWeatherData = async (lat: any, lon: any) => {
        try {
            const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&units=metric&appid=' + WEATHER_API_KEY)
            const result = await response.json()
            filterWeathers(result.list)
        } catch (error) {
            console.error(error)
        }
    }

    const getLatLon = async () => {
        const lat = await AsyncStorage.getItem('lat')
        const lon = await AsyncStorage.getItem('lon')
        if (await lat !== null && await lon !== null){
           fetchWeatherData(lat, lon)
        }
    }

    useEffect(() => {
        getLatLon()
    }, [])

    const timeStampDate = (dt: string) => {
        const [date, time] = dt.split(' ')
        const [year,month,day] = date.split('-')
        
        return `${day}.${month}.${year}`
    }

    const timeStampHours = (dt: String) => {
        const [date, time] = dt.split(' ')
        const [hour, min, sec] = time.split(':')

        return `${hour}:00`
    }

    const itemSeparator = () => <View style={{ height: 1, backgroundColor: 'black' }}></View>
    
    if(status){
        return(
            <SafeAreaProvider>
            <LinearGradient
                style={{flex: 1, borderWidth: 2}}
                colors={['rgb(200,100,100)','orange']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getLatLon}></RefreshControl>}
                >
                    {filtered?.map((item, index) => {
                        return(
                            <View key={index} style={{height: 75}}>
                                <Text style={{marginLeft: 8, fontSize: 20}}>{timeStampDate(item[0].dt_txt)}</Text>
                                <ScrollView 
                                horizontal={true}
                                >
                                <View style={{flexDirection: 'row', padding: 2, paddingLeft: 4}}>
                                    {item.map((row: any, index: number) => <View key={index} 
                                    style={{backgroundColor: 'rgb(230,230,230)', margin: 4, width: 80, borderRadius: 4, justifyContent: 'center', alignItems: 'center'}}
                                    >
                                        <Text style={{flex: 1}} >{Math.round(row.main.temp)}°C</Text>
                                        <Text>{timeStampHours(row.dt_txt)}</Text>
                                        </View>)}
                                </View>
                                </ScrollView>
                                <View style={styles.listLineBreak}></View>
                            </View>
                        )
                    })}
                </ScrollView>
            </LinearGradient>
            </SafeAreaProvider>
        )
    }else{
        return(
            <View>
                <ActivityIndicator></ActivityIndicator>
            
            </View>
        )
    }
    
}