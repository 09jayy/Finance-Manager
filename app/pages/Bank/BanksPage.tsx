import { View, Text } from "react-native"
import {useState, useEffect, Dispatch, SetStateAction} from "react"
import {getBankData, Bank} from "./functions/banksPageFunction"
import {Widget} from "../../components/Widget"

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
                {banks.map((bank: Bank, index) => (
                    <Widget key={index} title={bank.name} showAdd={false}>
                        <Text>{bank.balance}</Text>
                    </Widget>
                ))}
            </Widget>
        </View>
    )
}