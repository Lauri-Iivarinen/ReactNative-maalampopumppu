import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import { WEATHER_API_KEY } from '@env'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from '@rneui/themed'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function WeatherReport({route, navigation, result}: any){

    const [status, setStatus] = useState(true)
    const [filtered, setFiltered] = useState<any[]>()
    console.log('result', result)

    const getDay = (str: string) => {
        const [date, time] = str.split(' ')
        const [year,month,day] = date.split('-')
        return day
    }

    const getDifferentDays = (weather: any[]) => {
        const days: string[] = [] 
        weather.forEach(item => {
            const day = getDay(item.dt_txt)
            if(!days.includes(day)) days.push(day)
        })

        return days
    }

    const filterWeathers = (weather: any[]) => {
        const days = getDifferentDays(weather)
        const reportsForDays: any[] = []
        days.forEach(dayNum => {
            const filtered = weather.filter(item => getDay(item.dt_txt) === dayNum)
            reportsForDays.push(filtered)

        })
        setFiltered(reportsForDays)
        setStatus(true)
    }

    const fetchWeatherData = async (lat: any, lon: any) => {
        console.log('weatherfetch', lat)
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

    const itemSeparator = () => <View style={{height: 1, backgroundColor: 'black'}}></View>
    if(status){
        return(
            <SafeAreaProvider>
            <LinearGradient
                style={{flex: 1}}
                colors={['rgb(200,100,100)','orange']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Button
                ViewComponent={LinearGradient} // Don't forget this!
                linearGradientProps={{
                    colors: ['black', 'white'],
                    start: { x: 0, y: 0.5 },
                    end: { x: 0.8, y: 0.5 },
                }}
                onPress={() => {getLatLon()}}
                >
                Refresh weather
                </Button>
                <View style={{flex: 1, flexDirection: 'row'}}>
                <FlatList
                data={filtered}
                renderItem={({item}) =>
                        <View>
                            <Text style={{fontSize: 20}}>{timeStampDate(item[0].dt_txt)}</Text>
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
                        </View>
                    }
                ItemSeparatorComponent={itemSeparator}
                />
                </View>
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