import { HOST } from "@env"
import { PumpCodes } from "../types/types"
import { CODES, OFFLINEDATA } from "./util"

//Added both fetches here for easy use in multiple components

//Fetch data from pump, REQUIRES same WLAN
export const fetchData = () => {
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
            return list
        })
        .catch(error => {
            console.log(error)
        })
    return []
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