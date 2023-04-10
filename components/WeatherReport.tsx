import React, {useEffect, useState} from 'react'
import { View, Text, FlatList } from 'react-native'
import { WEATHER_API_KEY } from '@env'

export default function WeatherReport(){

    //60.427358, 25.102478
    const lat = 60.427358
    const lon = 25.102478
    const [weather, setWeather] = useState<any>()
    const [status, setStatus] = useState(false)

    const fetchWeatherData = async () => {
        try {
            const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&units=metric&appid=' + WEATHER_API_KEY)
            const result = await response.json()
            //console.log(await result.list)
            setWeather(result)
            setStatus(true)
        } catch (error) {
            console.error(error)
        }
        
    }

    useEffect(() => {
        fetchWeatherData()
    }, [])

    const timeStamp = (dt: string) => {
        const [date, time] = dt.split(' ')
        const [year,month,day] = date.split('-')
        const [hour, min, sec] = time.split(':')
        
        return `${day}.${month}.${year} - ${hour}:${min}`
    }

    if(status){
        return(
            <View style={{flex: 1}}>
                <FlatList
                data={weather.list}
                renderItem={({item}) => 
                    <View>
                        <Text>{timeStamp(item.dt_txt)}</Text>
                        <Text>Temperature: {item.main.temp}</Text>
                    </View>}
                />
            </View>
        )
    }else{
        return(
            <Text>Fethcing</Text>
        )
    }
    
}