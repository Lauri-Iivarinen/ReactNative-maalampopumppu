import React, {useState, useEffect} from 'react'
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Icon, Input } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { MAP_QUEST_API_KEY } from '@env';


export default function DrawerScreen(){

    const [location, setLocation] = useState<string>('')
    const [ipAddress, setIpAddress] = useState<string>('')

    const [currLocation, setCurrLocation] = useState<string>('')
    const [currIpAddress, setCurrIpAddress] = useState<string>('')

    const getAsyncStorage = async () => {
      const asyncLocation = await AsyncStorage.getItem('location')
      setCurrLocation(await asyncLocation === null? 'You have not entered location for pump' : 'Pump location: '  + asyncLocation)
      const asyncIp = await AsyncStorage.getItem('ipAddress')
      setCurrIpAddress(await asyncIp === null? 'You have not entered IP address' : 'IP address: ' + asyncIp)
    }
  
    const saveAndUpdateLatLon = (latitude: string, longtitude: string) => {
      AsyncStorage.setItem('lat', latitude)
      AsyncStorage.setItem('lon', longtitude)
    }

    const fetchLocation = async (loc: string) => {
        try {            
            const response = await fetch('https://www.mapquestapi.com/geocoding/v1/address?key='+MAP_QUEST_API_KEY+'&location=' + loc)
            const result = await response.json()
           
            const lat = await result.results[0].locations[0].displayLatLng.lat.toString()
            const lon = await result.results[0].locations[0].displayLatLng.lng.toString()

            saveAndUpdateLatLon(await lat, await lon)
            
        } catch (error) {
            console.error(error)
        }

    }

    const saveAsyncStorage = async () => {
        if(location !== currLocation && location.length > 0) {
            await AsyncStorage.setItem('location', location)
            fetchLocation(location)
            setLocation('')
        }
        if(ipAddress !== currIpAddress && ipAddress.length > 0){
            await AsyncStorage.setItem('ipAddress', ipAddress)
            setIpAddress('')
        }
        getAsyncStorage()
    }

    useEffect(() => {getAsyncStorage()}, [])

    return(
        <View 
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}
        >
            <Text>{currLocation}</Text>
            <Input placeholder='Location (city)' value={location} onChangeText={(e) => setLocation(e)}></Input>
            <Text>{currIpAddress}</Text>
            <Input placeholder='IP address' value={ipAddress} onChangeText={(e) => setIpAddress(e)}></Input>
            <Button
                ViewComponent={LinearGradient} // Don't forget this!
                linearGradientProps={{
                    colors: ['orange', 'rgb(200,100,100)'],
                    start: { x: 0, y: 0.5 },
                    end: { x: 0.8, y: 0.5 },
                }}
                onPress={saveAsyncStorage}
            >
                Save<Icon name='save' color='white'></Icon>
            </Button>
        </View>
    )
}