import { useContext } from "react"
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet} from "react-native"
import { banksContext } from "../pages/Bank/BanksContext"

const capitalise = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

export const EditForm = () => {
    const {editObject, setEditObject} = useContext(banksContext)

    return (
        <SafeAreaView>
            <View>
            {
                Object.entries(editObject).map(([key, value], index) => (
                    key != "_id" && 
                    <View key={index} style={styles.fieldContainer}>
                        <Text style={styles.key}>{capitalise(key)}</Text>
                        <TextInput placeholder={ !(typeof value == "string") ? `£${value}` : value} style={styles.valueInput}/>
                    </View>
                ))
            }
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>SUBMIT</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.btn, backgroundColor: "#e01414"}}>
                        <Text style={styles.btnText}>BACK</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    key: {
        fontSize: 18,
        paddingLeft: 20,
        paddingBottom: 5
    },
    valueInput: {
        width: "100%",
        backgroundColor: "white",
        fontSize: 16, 
        padding: 3,
        paddingLeft: 20
    },
    fieldContainer: {
        marginTop: 5,
        marginBottom: 5
    },
    title: {
        fontSize: 18, 
        margin: 10
    },
    titleContainer: {
        alignItems: "center"
    },
    btn: {
        backgroundColor: "#1776e3",
        borderRadius: 5,  
        width: 230,
        height: 30, 
        justifyContent: "center", 
        alignItems: "center",
        margin: 10 
    },
    btnText: {
        color: "white",
        fontSize: 16,
    },
    btnContainer: {
        marginTop: 60,
        alignItems: "center"
    }
})