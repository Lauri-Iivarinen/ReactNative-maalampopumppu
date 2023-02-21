import {StyleSheet} from 'react-native'

import { useColorScheme } from 'react-native';

const scheme = useColorScheme()

export const styles = StyleSheet.create({
    main: {
        color: scheme === 'light' ? '#fff' : '#000',
        backgroundColor: scheme === 'light' ? '#fff': '#000'
    }
})