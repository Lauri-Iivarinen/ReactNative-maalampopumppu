import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { PumpCodes } from "../types/types";
import { Button, Dialog, ListItem ,Card, Input } from "@rneui/themed";
import { Icon } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import { posthWithIp } from "../util/fetch";
import { styles } from "../util/stylesheet";
import { getValue } from "../util/util";


export default function PumpDataListItem({ props }: any) {

    const [expanded, setExpanded] = useState(false)
    const [activeData, setActiveData] = useState<PumpCodes>()
    const [confirmDialog, setConfirmDialog] = useState(false)
    const [updateValue, setUpdateValue] = useState<string>('')

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
        if(await response.response === 'Ok') props.snackbar()//console.log(response)
        
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
                        <View key={item.code}>
                            {props.keywordType === 'set'
                            ?<ListItem.Swipeable
                                bottomDivider={true}
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
                            :<ListItem
                                    bottomDivider={true}
                            >
                                <ListItem.Content style={{flexDirection: 'column'}}>
                                    <ListItem.Title>{item.name}</ListItem.Title>
                                    {props.keyword === 'Status' || props.keyword === 'Set Status'
                                    ?<ListItem.Subtitle>{getIcon(item)}</ListItem.Subtitle>
                                    :<ListItem.Subtitle>{getValue(item.value, item.valueType!)}</ListItem.Subtitle>
                                    }
                                </ListItem.Content>
                                <ListItem.Content />
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