import React from "react";
import { View, Text, FlatList } from "react-native";
import { PumpCodes } from "../types/types";

interface DataListItem{
    data: PumpCodes[];
    keyword: string;
}

export default function PumpDataListItem({props}: any) {
    
    //console.log(props.data)

    //Separate list components
    const separator = () => {
        return <View style={{ backgroundColor: 'black', height: 1, marginRight: 10 }}></View>
    }

    const filterByKeyword = (data: PumpCodes[], keyword: string) => {
        return data.filter(item => item.valueType === keyword)
    }

    return (
        <View style={{marginBottom: 5 ,width:'50%'}}>
            <Text style={{ fontSize: 20 }}>{props.keyword}:</Text>
                <FlatList
                    data={filterByKeyword(props.data, props.keyword)}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1}}>
                            <Text style={{marginRight: 20}}>{item.name}</Text>
                            <Text style={{marginRight: 20}}>{item.value}</Text>
                        </View>
                    }
                    ItemSeparatorComponent={separator}    
                />
            </View>
    )
}