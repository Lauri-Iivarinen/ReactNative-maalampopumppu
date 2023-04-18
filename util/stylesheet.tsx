import { StyleSheet } from "react-native";

import { useFonts, AlegreyaSC_400Regular } from "@expo-google-fonts/alegreya-sc";

export const styles = StyleSheet.create({
    header: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'black'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centeredNoFlex: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    pumpListContainer: {
        flex: 1,
        padding: 3
    },
    snackbarStyle : {
        position: "absolute",
        start: 16,
        end: 16,
        bottom: 16
    },
    textStyle: {
        fontFamily: 'AlegreyaSC_400Regular'
    }
})