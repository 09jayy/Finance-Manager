import { View, Text, StyleSheet, ScrollView} from "react-native"
import {BankAccountSection} from "./components/BankAccountSection"
import { TransactionsSection } from "./components/TransactionsSection"
import { useState, useEffect } from "react"
import { Bank, getBankData } from "./functions/banksPageFunction"

export const BanksPage = ({navigation}: any) => {
    const [banks, setBanks] = useState([] as Bank[])

    return (
        <ScrollView>
            <BankAccountSection banks={banks} setBanks={setBanks}/>
            <TransactionsSection banks={banks} setBanks={setBanks}/>
        </ScrollView>
    )
}