import { HOST } from "@env"
import { PumpCodes } from "../types/types"
import { CODES, OFFLINEDATA } from "./util"
import AsyncStorage from "@react-native-async-storage/async-storage"

//Added both fetches here for easy use in multiple components

/** Transform fetch result into type PumpCodes[] */
const transformToPumpCodes = (item: any[]) => {
    const list: PumpCodes[] = []
    const values = Object.entries(item)

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

export const fetchWithIp = async () => {
    const ip = await AsyncStorage.getItem('ipAddress')
    if (await ip !== null) return fetchData(ip!)
    else return []
}

/**Fetch data from pump, REQUIRES same WLAN*/
export const fetchData = async (ip=HOST) => {
    try {
        const response = await fetch('http://' + ip + '/api/alldata')
        const result = await response.json()
        const pumpCodes: PumpCodes[] = await transformToPumpCodes(result)
        return await pumpCodes
    } catch (error) {
        console.log(error)
        return []
    }
}

/**Fetch hard coded testdata for developing away from pump wlan*/
export const fetchOfflineData = () => {
    const list: PumpCodes[] = []
    const values = Object.entries(OFFLINEDATA)

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

export const posthWithIp = async (variable: PumpCodes, value: any) => {
    const ip = await AsyncStorage.getItem('ipAddress')
    if (await ip !== null) return postToPump(variable, value, ip!)
    else return []
}

const postToPump = async (variable: PumpCodes, value: any, ip=HOST) => {
    console.log(variable, value)
    if(variable.value.toString() === value.toString()) return {msg: 'ok'}
    try {
        const response = await fetch('http://' + ip + '/api/set?idx=' + variable.code + '&val=' + value)
        const result = await response.json()
        //console.log(await result)
        return await result
    } catch (error) {
        console.error(error)
        return {msg: 'not ok'} //REMOVE ON WORKING
    }
}