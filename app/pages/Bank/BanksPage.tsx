import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import {useState, useEffect, useContext} from "react"
import {Widget} from "../../components/Widget"
import {TitleValueWidget} from "../../components/TitleValueWidget"
import {EditForm} from "../../components/EditForm"
import {BankAccountSection} from "./components/BankAccountSection"

export const BanksPage = ({navigation}: any) => {
    return (
        <View>
            <BankAccountSection/>
        </View>
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