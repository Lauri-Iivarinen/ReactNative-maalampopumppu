import React, { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { HOST } from '@env'
import { CODES, OFFLINEDATA } from '../util/util'
import { PumpCodes } from "../types/types";

export default function PumpStatus() {

    const [data, setData] = useState<PumpCodes[]>([])

    //Fetch data from pump, REQUIRES same WLAN
    const fetchData = () => {
        fetch('http://' + HOST + '/api/alldata')
            .then(response => response.json())
            .then(result => {
                //setData(result)
                //console.log(result)
                //const keys = Object.keys(result)
                const list: PumpCodes[] = []
                const values = Object.entries(result)
                //console.log(values)
                values.forEach(value => {
                    const code = CODES.find(i => {
                        return i.code === value[0]
                    })
                    const codeData: PumpCodes = {
                        name: code!.name,
                        code: code!.code,
                        value: value[1],
                        valueType: code?.valueType
                    }
                    list.push(codeData)
                })
                setData(list)
            })
            .catch(error => console.log(error))
    }

    //Fetch hard coded testdata for developing away from pump
    const fetchOfflineData = () => {
        const list: PumpCodes[] = []
                const values = Object.entries(OFFLINEDATA)
                //console.log(values)
                values.forEach(value => {
                    const code = CODES.find(i => {
                        return i.code === value[0]
                    })
                    const codeData: PumpCodes = {
                        name: code!.name,
                        code: code!.code,
                        value: value[1],
                        valueType: code?.valueType
                    }
                    list.push(codeData)
                })
                setData(list)
    }

    useEffect(() => {
        //fetchData()
        fetchOfflineData()
    }, [])

    //Separate list components
    const separator = () => {
        return <View style={{ backgroundColor: 'black', height: 1, marginRight: 10 }}></View>
    }
    
    return (
        <View style={{ flex: 1 }}>
            <View style={{flex: 1}}>
                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1}}>
                            <Text style={{marginRight: 20}}>{item.name}</Text>
                            <Text style={{marginRight: 20}}>{item.value} {item.valueType}</Text>
                        </View>
                    }
                    ItemSeparatorComponent={separator}    
                />
            </View>
        </View>
    )
}

/*

 0001,Radiator Return
 0002,Radiator Forward
 0003,Heat carrier Return
 0004,Heat carrier Forwrd
 0005,Brine in/Evaporator
 0006,Brine out/Condenser
 0007,Outdoor
 0008,Indoor
 0009,Warm water 1 / Top
 000A,Warm water 2 / Mid
 000B,Hot gas / Compr.
 3104,Add heat status  0W
 0107,Heating setpoint
 0111,Warm water setpoint
 0203,Room temp setpoint
 2204,Room sensor influence
 2205,Heat set 1, CurveL
 0207,Heat set 3, Parallel
 0208,Warm Water stop temp
 020B,Warm water Difference
 7209,Extra Warm Water
 1215,Elect. heater switch
 1233,External control
 020A,Summer mode
 2210,Holiday mode
 1A01,Compressor  0W
 1A02,Add heat step 1  0W
 1A03,Add heat step 2  0W
 1A04,Pump Cold circuit  0W
 1A05,Pump Heat circuit  0W
 1A06,Pump Radiator  0W
 1A07,Switch valve 1  0W
 1A20,Alarm  0W
 BA91,Alarm Code
 6C55,Compr. cons. heating
 6C56,Compr. cons. hotwat
 6C58,Aux cons. heating
 6C59,Aux cons. hot water

*/