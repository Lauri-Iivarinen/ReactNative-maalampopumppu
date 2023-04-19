import { StyleSheet } from "react-native";

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
    snackbarStyle: {
        position: "absolute",
        start: 16,
        end: 16,
        bottom: 16
    },
    textStyle: {
    },
    listLineBreak: {
        height: 1,
        marginRight: 5,
        marginLeft: 5,
        backgroundColor: 'black'
    },
    cardContent: {
        flex: 1,
        margin: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        padding: 2,
        backgroundColor: 'white'
    }
})