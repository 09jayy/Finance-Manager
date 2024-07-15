import { View, Text, StyleSheet, ScrollView} from "react-native"
import {BankAccountSection} from "./components/BankAccountSection"

export const BanksPage = ({navigation}: any) => {
    return (
        <ScrollView>
            <BankAccountSection/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    bankList: {
        marginTop: 20
    }
})

const bankAccountStyles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "500"
    },
    value: {
        fontSize: 16
    }
})