import { HOST } from "@env"
import { PumpCodes } from "../types/types"
import { CODES, OFFLINEDATA } from "./util"

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

/**Fetch data from pump, REQUIRES same WLAN*/
export const fetchData = async () => {
    try {
        const response = await fetch('http://' + HOST + '/api/alldata')
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