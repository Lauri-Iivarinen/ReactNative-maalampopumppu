import {StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const getColor = () => {
    let vari: string | null = ''
    try {
        AsyncStorage.getItem('theme').then(color => vari = color)
        return vari
    } catch (error) {
        return 'light'
    }
}

const scheme = getColor()

export const styles = StyleSheet.create({
    main: {
        color: scheme === 'light' ? '#fff' : '#000',
        backgroundColor: scheme === 'light' ? '#fff': '#000'
    }
})