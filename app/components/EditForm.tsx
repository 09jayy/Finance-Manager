import { useContext } from "react"
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet} from "react-native"
import { banksContext } from "../pages/Bank/BanksContext"

export const EditForm = () => {
    const {editObject, setEditObject} = useContext(banksContext)

    return (
        <SafeAreaView>
            <View>
            {
                Object.entries(editObject).map(([key, value], index) => (
                    key != "_id" && 
                    <View key={index} style={styles.fieldContainer}>
                        <Text style={styles.key}>{key}</Text>
                        <TextInput placeholder={`${value}`} style={styles.valueInput}/>
                    </View>
                ))
            }
            </View>

            <TouchableOpacity>
                <Text>SUBMIT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    key: {
        fontSize: 18,
        paddingLeft: 10
    },
    valueInput: {
        width: "100%",
        backgroundColor: "white",
        fontSize: 16, 
        padding: 3,
        paddingLeft: 10
    },
    fieldContainer: {
        marginTop: 5,
        marginBottom: 5
    }
})