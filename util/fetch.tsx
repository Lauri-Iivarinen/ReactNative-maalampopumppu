import { HOST } from "@env"
import { PumpCodes } from "../types/types"
import { CODES, OFFLINEDATA } from "./util"

//Added both fetches here for easy use in multiple components

const transformToPumpCodes = (item: any[]) => {
    const list: PumpCodes[] = []
    //console.log(item)

    const values = Object.entries(item)
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
    return list
}

//Fetch data from pump, REQUIRES same WLAN
export const fetchData = async () => {
    const list: PumpCodes[] = []
    try {
        const response = await fetch('http://' + HOST + '/api/alldata')
        const result = await response.json()
        const pumpCodes: PumpCodes[] = await transformToPumpCodes(result)
        //console.log(await pumpCodes)
        return await pumpCodes
    
    } catch (error) {
        console.log(error)
        return []
    }
}

//Fetch hard coded testdata for developing away from pump
export const fetchOfflineData = () => {
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
    
    return list
}