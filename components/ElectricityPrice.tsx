import React from 'react';
import { useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { styles } from '../styles/styles'
import { LineChart } from 'react-native-chart-kit';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dataset } from 'react-native-chart-kit/dist/HelperTypes';

export default function ElectricityPrice(){
    interface sahko {
        price: number;
        startDate: string;
        endDate: string;
    }
    

    const [porssisahko, setPorssisahko] = useState<sahko[]>([])
    const screenWidth = Dimensions.get("window").width;
    const [status, setStatus] = useState(false)
    const [labels, setLabels] = useState<string[]>()
    const [dataset, setDataset] = useState<any[]>()

    const fetchE = async () => {
        try {
            const response = await fetch('https://api.porssisahko.net/v1/latest-prices.json')
            const res = await response.json()
            //console.log(await res)
            setPorssisahko(await res.prices)
            setDataset(next24(await res.prices))
            setLabels(getLabels(await res.prices))
            setStatus(true)
            //await AsyncStorage.setItem('porssisahko',JSON.parse(res.prices))
        } catch (error) {
            //setPorssisahko(offline.prices)
        }
    }
    
    useEffect(() => {
        fetchE()
        //setPorssisahko(offline.prices)
    }, [])

    const get24Hours = (sahko: sahko[]) => {
        const date = new Date()
        const reverseData = sahko.slice().reverse()
        const upToDate = reverseData.find(item => {
            const itemDate = new Date(item.startDate)
            if (date.getDay() === itemDate.getUTCDay() && date.getHours() === itemDate.getUTCHours()) {
                return item
            }
        })

        const day = upToDate ? reverseData.splice(reverseData.indexOf(upToDate) - 1, 24) : []
        //console.log(day)
        return day
    }

    const next24 = (sahko: sahko[]) => {
        if (sahko.length > 0) {
        const day = get24Hours(sahko)
        const sets: Dataset[] = []
        const data: number[] = day.map(a => a.price)
        const set = {
            data: data,
            strokeWidth: 2,
            color: () => 'orange'
        }
        sets.push(set)
            return sets
        } else {
            return [{data: [], strokeWidth: 2, color: () => 'black'}]
        }
    }


    const getLabels = (sahko: sahko[]) => {
        const date = new Date()
        //Only take values from items that are also shown in chart (from this hour -1 ->)
        const hours: sahko[] = get24Hours(sahko).filter(item => {
            const itemDate = new Date(item.startDate);
            return date.getHours() + 1 < itemDate.getHours()
        })

        const result = hours.map(item => {
            const hour = new Date(item.startDate).getUTCHours()

            if (hour % 2 === 0) return hour.toString()
            return ''
        })

        return result
    }

    const data = {
        labels: labels,
        datasets: dataset,
        legend: ['Pörssisähkö']
    }

    const chartConfig = {
        backgroundGradientFrom: "#08130D",
        backgroundGradientFromOpacity: 0.4,
        backgroundGradientTo: "#1E2923",
        backgroundGradientToOpacity: 0.1,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        barPercentage: 0,
      };

    if(status){
        return(
            <View>
                <LineChart
                    //@ts-ignore
                    data={data}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    withHorizontalLines={true}
                    withVerticalLines={false}
                    withDots={false}
                />
            </View>
            )
    }else{
        return(
            <Text>Fetching...</Text>
        )
    }
   
}