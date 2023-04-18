import React, {useEffect, useState} from 'react';
import { View, Text} from 'react-native';
import {HOST} from '@env'
import { fetchOfflineData, fetchData, fetchWithIp, posthWithIp } from '../util/fetch'
import { getKeywords} from '../util/util'
import { PumpCodes } from '../types/types';
import PumpDataListItem from './PumpDataListItem';
import Slider from '@react-native-community/slider';
import { Button, Icon } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { Dialog } from '@rneui/themed';
import { Snackbar } from "@react-native-material/core";
import { styles } from '../util/stylesheet';

export default function PumpConfigSliders({ route, navigation }: any) {
    //idx-> ID, val -> VALUE, USE Promise.all()
    const POSTENDPOINT = 'http://' + HOST + 'api/set?idx=2204&val=220'
    const [data, setData] = useState<PumpCodes[]>([])
    const KEYWORDS = getKeywords('set')

    const [heatCurve, setHeatCurve] = useState<PumpCodes>()
    const [heatCurveValue, setHeatCurveValue] = useState<number>()
    const [roomTemp, setRoomTemp] = useState<PumpCodes>()
    const [roomTempValue, setRoomTempValue] = useState<number>()
    const [status, setStatus] = useState('fetching')
    const [confirmDialog, setConfirmDialog] = useState(false)
    const [snackbarVisible, setSnackbarVisible] = useState(false)

    const doFetch = async () => {
        let fetchedData = fetchWithIp()
        setData(await fetchedData)
    }

    useEffect(() => {
        //doFetch()
        setData(fetchOfflineData())
    },[])

    useEffect(() => {
        let curve = null
        let roomTemp = null
        if (data.length > 0) {
            curve = data.find(item => item.name === 'Heat set 1')
            setHeatCurve(curve)
            setHeatCurveValue(curve!.value)

            roomTemp = data.find(item => item.name === 'Room temp setpoint')
            //console.log(roomTemp)
            setRoomTemp(roomTemp)
            setRoomTempValue(roomTemp!.value)

            setStatus('')
        }
    }, [data])

    const toggleSnackbar = () => {
        setSnackbarVisible(true)
        setTimeout(() => setSnackbarVisible(false), 4000)
    }
 
    const checkResponse = (response: any, json: PumpCodes, newValue: number) => {
        if (response.msg === 'ok') {
            const code: PumpCodes = {
                code: json.code,
                name: json.name,
                value: newValue,
                valueType: json.valueType
            }
            toggleSnackbar()
            return code
        }else{
            return json
        }
    }
    
    const updateConfig = () => {
        setConfirmDialog(!confirmDialog)
        Promise.all([posthWithIp(heatCurve!, heatCurveValue!), posthWithIp(roomTemp!, roomTempValue!)])
            .then(responses => {
                setHeatCurve(checkResponse(responses[0], heatCurve!, heatCurveValue!))
                setRoomTemp(checkResponse(responses[1], roomTemp!, roomTempValue!))
            })
        //postToPump(heatCurve!, heatCurveValue!)
    }

    if (status.length === 0) {
        return (
            <View style={{flex: 1}}>
                <View style={styles.centered}>
                    <Text style={styles.textStyle}>Heating curve</Text>
                    <Text>{heatCurve?.value / 10}</Text>
                    <Text style={{color: 'red'}}>{heatCurveValue ? heatCurveValue / 10 : heatCurve?.value / 10}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <Text>1.6</Text>
                        <Slider
                            style={{ width: 200, height: 40 }}
                            minimumValue={16}
                            maximumValue={22}
                            step={1}
                            value={heatCurve?.value}
                            onValueChange={(e) => setHeatCurveValue(e)}
                            />
                        <Text>2.2</Text>
                    </View>
                </View>
                <View style={styles.centered}>
                    <Text>Room temperature setpoint</Text>
                    <Text>{roomTemp?.value / 10}°C</Text>
                    <Text style={{ color: 'red' }}>{ roomTempValue? (roomTempValue / 10).toFixed(1) : (roomTemp?.value / 10).toFixed(1)}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <Text>18</Text>
                        <Slider
                            style={{ width: 200, height: 40 }}
                            minimumValue={180}
                            maximumValue={230}
                            step={1}
                            value={roomTemp?.value}
                            onValueChange={(e) => setRoomTempValue(e)}
                            />
                        <Text>23</Text>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center'}}>
                <Button
                ViewComponent={LinearGradient} // Don't forget this!
                linearGradientProps={{
                    colors: ['rgb(200,100,100)','orange'],
                    start: { x: 0, y: 0.5 },
                    end: { x: 1, y: 0.5 },
                }}
                onPress={() => setConfirmDialog(!confirmDialog)}
                >
                Update <Icon name='update' color='white'></Icon>
                </Button>
                </View>
                <Dialog 
                isVisible={confirmDialog}
                onBackdropPress={() => setConfirmDialog(!confirmDialog)}
                overlayStyle={styles.centeredNoFlex}
                >
                <Dialog.Title title="Are you sure?" />
                <Dialog.Actions>
                    <Dialog.Button
                        type='solid'
                        ViewComponent={LinearGradient} // Don't forget this!
                        linearGradientProps={{
                            colors: ['rgb(200,100,100)','orange'],
                            start: { x: 0, y: 0.5 },
                            end: { x: 1, y: 0.5 },
                        }}
                        onPress={() => setConfirmDialog(!confirmDialog)}
                        >
                        No <Icon name='cancel' color='white'></Icon>
                    </Dialog.Button>
                    <Dialog.Button
                        type='solid'
                        ViewComponent={LinearGradient} // Don't forget this!
                        linearGradientProps={{
                            colors: ['rgb(200,100,100)','orange'],
                            start: { x: 0, y: 0.5 },
                            end: { x: 1, y: 0.5 },
                        }}
                        onPress={updateConfig}
                    >
                    Yes <Icon name='check' color='white'></Icon>
                    </Dialog.Button>
                </Dialog.Actions>
                </Dialog>
            {snackbarVisible
            &&<Snackbar
            message='Successfully updated'
            style={styles.snackbarStyle}
            ></Snackbar>}
            </View>
        )
    } else {
        return(
            <View style={{flex: 1}}>
                <Text>{ status }</Text>
            </View>
        )
    }
   
}