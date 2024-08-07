import { View, Text, StyleSheet, ScrollView} from "react-native"
import {BankAccountSection} from "./components/BankAccountSection"
import { TransactionsSection } from "./components/TransactionsSection"
import { useState, useEffect } from "react"

export const BanksPage = ({navigation}: any) => {
    return (
        <ScrollView>
            <BankAccountSection/>
            <TransactionsSection/>
        </ScrollView>
    )
}