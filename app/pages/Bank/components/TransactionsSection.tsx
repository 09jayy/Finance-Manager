import { TouchableOpacity, View, StyleSheet } from "react-native"
import { Widget } from "../../../components/Widget"
import { TitleValueWidget } from "../../../components/TitleValueWidget"
import { useEffect, useState } from "react"
import { getTransactions, Transaction } from "../functions/transactionFunctions"

export const TransactionsSection = () => {
    const [transactions, setTransactions] = useState([] as Transaction[])

    useEffect(()=>{
        getTransactions().then(response => {
            if (!response.ok){
                return response.text().then(text => {throw new Error(text)})
            }

            return response.json()
        }).then(body => {
            setTransactions(body)
        }).catch( (error: Error) => {
            console.error(error.message)
        })
    },[])

    return (
        <View>
            <Widget title="Transactions" showAdd={true}>
                <View>
                    {transactions.map((transaction) => (
                        <TouchableOpacity key={transaction._id} onPress={() => {}}>
                            <TitleValueWidget title={transaction.name} value={`£${transaction.pay.toLocaleString()}`} key={transaction._id} direction="row" styleProp={transactionStyles}/>
                        </TouchableOpacity>
                    ))
                    }
                </View>
            </Widget>
        </View>
    )
}

const transactionStyles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "500",
        flex: 1
    },
    value: {
        fontSize: 16
    }
})