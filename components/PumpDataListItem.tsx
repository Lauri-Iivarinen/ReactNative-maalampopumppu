import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { PumpCodes } from "../types/types";
import { Button, Dialog, ListItem ,Card, Input } from "@rneui/themed";
import { Icon } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import { posthWithIp } from "../util/fetch";
import { styles } from "../util/stylesheet";


export default function PumpDataListItem({ props }: any) {

    const [expanded, setExpanded] = useState(props.keyword === 'Status' ? true : false)
    const [activeData, setActiveData] = useState<PumpCodes>()
    const [confirmDialog, setConfirmDialog] = useState(false)
    const [updateValue, setUpdateValue] = useState<string>('')

    const getValue = (value: number, keyword: string) => {
        switch (keyword) {
            case 'Status':
                return value === 0 ? 'OFF' : 'ON'
            case 'Percent usage':
                return value + '%'
            case 'Temp variable':
                return (value / 10).toFixed(2) + ' °C'
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
                return (value / 10).toFixed(2) + ' °C'
            case 'Set temp':
                return (value / 10).toFixed(2) + ' °C'
            default:
                return value + ' raw value'
        }
    }

    const filterByKeyword = (data: PumpCodes[], keyword: string) => {
        return data.filter(item => item.valueType === keyword)
    }

    const getIcon = (item: PumpCodes) => {
        const name = item.value === 0 ? 'cancel' : 'check'
        return(<View style={{alignItems: 'center'}}><Icon name={name} color={item.value === 0 ? 'red': 'green'}></Icon><Text>{getValue(item.value, item.valueType!)}</Text></View>)
    }

    const updateData = async () => {
        setConfirmDialog(false)
        const response = await posthWithIp(activeData!, updateValue)
        if(await response.msg === 'ok') props.snackbar()//console.log(response)
        
        setUpdateValue('')
    }

    return (
        <View style={{marginBottom: 5, borderWidth:2}}>
            <ListItem.Accordion
            isExpanded={expanded}
            onPress={() => setExpanded(!expanded)}
            content={
                <ListItem.Content>
                  <ListItem.Title>{props.keyword}</ListItem.Title>
                  <ListItem.Subtitle>Tap to expand{props.keywordType === 'set' && ', swipe to edit'}</ListItem.Subtitle>
                </ListItem.Content>
              }
            >
                {filterByKeyword(props.data, props.keyword).map(item => {
                    return (
                        <View>
                            {props.keywordType === 'set'
                            ?<ListItem.Swipeable key={item.code}
                                rightContent={(reset) => (
                                    <Button
                                        ViewComponent={LinearGradient} // Don't forget this!
                                        linearGradientProps={{
                                            colors: ['orange','rgb(200,100,100)'],
                                            start: { x: 0, y: 0.5 },
                                            end: { x: 1, y: 0.5 },
                                        }}
                                        onPress={() => {
                                            setActiveData(item)
                                            setConfirmDialog(true)
                                            reset()
                                        }}
                                        buttonStyle={{ minHeight: '100%'}}
                                        >
                                        Update <Icon name='update' color='white'></Icon>
                                        </Button>
                                    )}
                            >
                                <ListItem.Content style={{flexDirection: 'column'}}>
                                    <ListItem.Title>{item.name}</ListItem.Title>
                                    {props.keyword === 'Status' || props.keyword === 'Set Status'
                                    ?<ListItem.Subtitle>{getIcon(item)}</ListItem.Subtitle>
                                    :<ListItem.Subtitle>{getValue(item.value, item.valueType!)}</ListItem.Subtitle>
                                    }
                                </ListItem.Content>
                            </ListItem.Swipeable>
                            :<ListItem key={item.code}>
                                <ListItem.Content style={{flexDirection: 'column'}}>
                                    <ListItem.Title>{item.name}</ListItem.Title>
                                    {props.keyword === 'Status' || props.keyword === 'Set Status'
                                    ?<ListItem.Subtitle>{getIcon(item)}</ListItem.Subtitle>
                                    :<ListItem.Subtitle>{getValue(item.value, item.valueType!)}</ListItem.Subtitle>
                                    }
                                </ListItem.Content>
                            </ListItem>
                            }
                        
                        </View>
                    )
                })}
            </ListItem.Accordion>
            <Dialog 
                isVisible={confirmDialog}
                onBackdropPress={() => setConfirmDialog(!confirmDialog)}
                overlayStyle={styles.centeredNoFlex}
                >
                <Card containerStyle={{marginBottom: 10, borderRadius: 5}}>
                    <Card.Title>To properly update variables use following instructions:</Card.Title>
                    <Card.Divider></Card.Divider>
                    <Text>Set temp - 20°C, input: 200</Text>
                    <Text>Set number - 1.8, input: 18 </Text>
                    <Text>Set Status - ON = 1, OFF = 0</Text>
                    <Text>Set Minutes - 33min, input: 33</Text>
                    <Text>Set Hour - 16h, input: 16</Text>
                </Card>
                <Dialog.Title title={'Updating ' + activeData?.name} />
                <Input placeholder="New value" onChangeText={(e) => setUpdateValue(e)}></Input>
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
                        Cancel <Icon name='cancel' color='white'></Icon>
                    </Dialog.Button>
                    <Dialog.Button
                        type='solid'
                        ViewComponent={LinearGradient} // Don't forget this!
                        linearGradientProps={{
                            colors: ['rgb(200,100,100)','orange'],
                            start: { x: 0, y: 0.5 },
                            end: { x: 1, y: 0.5 },
                        }}
                        onPress={() => updateData()}
                    >
                    Confirm <Icon name='check' color='white'></Icon>
                    </Dialog.Button>
                </Dialog.Actions>
                </Dialog>
        </View>
    )
}

/*
<ListItem key={item.code}>
                        <ListItem.Content style={{flexDirection: 'column'}}>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        {props.keyword === 'Status' || props.keyword === 'Set Status'
                        ?<ListItem.Subtitle>{getIcon(item)}</ListItem.Subtitle>
                        :<ListItem.Subtitle>{getValue(item.value, item.valueType!)}</ListItem.Subtitle>
                        }

                        </ListItem.Content>
                    </ListItem>
*/