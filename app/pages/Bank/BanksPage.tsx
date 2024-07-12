import { View, Text, StyleSheet } from "react-native"
import {useState, useEffect, Dispatch, SetStateAction} from "react"
import {getBankData, Bank} from "./functions/banksPageFunction"
import {Widget} from "../../components/Widget"
import {TitleValueWidget} from "../../components/TitleValueWidget"

export const BanksPage = () => {
    const [banks, setBanks]: [Bank[], Dispatch<SetStateAction<Bank[]>>]= useState([] as Bank[])

    useEffect(()=> {
        getBankData()
        .then( (data: Bank[]) => {
            setBanks(data)
        })
    },[])

    return (
        <View>
            <Widget title="Bank Accounts" showAdd={true}>
                <View style={styles.bankList}>
                    {banks.map((bank: Bank, index) => (
                        <TitleValueWidget title={bank.name} value={`£${bank.balance}`} key={index}/>
                    ))}
                </View>
            </Widget>
        </View>
    )
}

const styles = StyleSheet.create({
    bankList: {
        marginTop: 20
    }
})