import React from "react";
import { View, Text, FlatList } from "react-native";
import { PumpCodes } from "../types/types";

interface DataListItem{
    data: PumpCodes[];
    keyword: string;
}

export default function PumpDataListItem({ props }: any) {
    
    const getValue = (value: number, keyword: string) => {
        switch (keyword) {
            case 'Status':
                return value === 0 ? 'OFF' : 'ON'
            case 'Percent usage':
                return value + '%'
            case 'Temp variable':
                return (value / 10).toFixed(2) + ' C'
            case 'Number':
                return value
            case 'Time Hours':
                return value + ' h'
            case 'Set number':
                return (value/10).toFixed(2)
            case 'Set Minutes':
                return value + ' min'
            case 'Set Status':
                return value === 0 ? 'OFF' : 'ON'
            case 'Set Hour':
                return value + ' h'
            case 'Temp Sensor':
                return (value / 10).toFixed(2) + ' C'
            case 'Set temp':
                return (value / 10).toFixed(2) + ' C'
            default:
                return value + ' raw value'
        }
    }

    //Separate list components
    const separator = () => {
        return <View style={{ backgroundColor: 'blue', height: 1, marginRight: 10 }}></View>
    }

    const filterByKeyword = (data: PumpCodes[], keyword: string) => {
        return data.filter(item => item.valueType === keyword)
    }

    return (
        <View style={{marginLeft: '1%' ,marginBottom: 5 ,width:'48%', borderWidth:2}}>
            <Text style={{ fontSize: 20 }}>{props.keyword}:</Text>
                <FlatList
                    data={filterByKeyword(props.data, props.keyword)}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1}}>
                            <Text style={{marginRight: 20}}>{item.name}</Text>
                            <Text style={{marginRight: 20}}>{getValue(item.value, item.valueType!)}</Text>
                        </View>
                    }
                    ItemSeparatorComponent={separator}    
                />
            </View>
    )
}