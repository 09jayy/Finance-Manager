import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import {useState, useEffect, Dispatch, SetStateAction} from "react"
import {getBankData, Bank} from "./functions/banksPageFunction"
import {Widget} from "../../components/Widget"
import {TitleValueWidget} from "../../components/TitleValueWidget"

export const BanksPage = () => {
    const [banks, setBanks] = useState([] as Bank[])

    useEffect(()=> {
        getBankData()
        .then( (data: Bank[]) => {
            console.log(data)
            setBanks(data)
        })
    },[])

    return (
        <View>
            <Widget title="Bank Accounts" showAdd={true}>
                <View style={styles.bankList}>
                    {banks.map((bank: Bank) => (
                        <TouchableOpacity>
                            <TitleValueWidget title={bank.name} value={`Balance: £${bank.balance}`} key={bank._id} direction="column" styleProp={bankAccountStyles}/>
                        </TouchableOpacity>
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

const bankAccountStyles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "500"
    },
    value: {
        fontSize: 16
    }
})