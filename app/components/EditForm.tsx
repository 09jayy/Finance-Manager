import { useContext } from "react"
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet} from "react-native"
import { banksContext } from "../pages/Bank/BanksContext"

const capitalise = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

export const EditForm = () => {
    const {editObject, setEditObject, title} = useContext(banksContext)

    return (
        <SafeAreaView>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>

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

            <TouchableOpacity>
                <Text>SUBMIT</Text>
            </TouchableOpacity>
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
    }
})