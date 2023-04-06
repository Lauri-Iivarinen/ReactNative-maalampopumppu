import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { PumpCodes } from "../types/types";
import PumpDataListItem from "./PumpDataListItem";
import { fetchOfflineData, fetchData } from '../util/fetch'
import { getKeywords } from "../util/util";

export default function PumpStatus() {

    const [data, setData] = useState<PumpCodes[]>([])
    const KEYWORDS = getKeywords('get')

    const doFetch = async () => {
        let fetchedData = fetchData()
        setData(await fetchedData)
    }

    useEffect(() => {
        //doFetch()
        setData(fetchOfflineData())
    }, [])

    return (
        <View style={{ flex: 1, flexDirection: 'column', flexWrap:'wrap', flexBasis:250}}>
            {KEYWORDS.map((keyword,index) => {
                return (
                    <PumpDataListItem key={index} props={{ data: data, keyword: keyword }} />
                )
            })}
        </View>
    )
}

/*

<PumpDataListItem props={{ data: data, keyword: 'Temp Sensor' }} />
<PumpDataListItem props={{ data: data, keyword: 'Percent usage' }} />
<PumpDataListItem props={{ data: data, keyword: 'Temp variable' }} />
<PumpDataListItem props={{ data: data, keyword: 'Status' }} />
<PumpDataListItem props={{ data: data, keyword: 'Number' }} />
<PumpDataListItem props={{ data: data, keyword: 'Time Hours' }} />

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