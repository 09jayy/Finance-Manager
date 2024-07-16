import { TouchableOpacity, View, StyleSheet, Pressable, Text } from "react-native"
import { Widget } from "../../../components/Widget"
import { TitleValueWidget } from "../../../components/TitleValueWidget"
import { useEffect, useState } from "react"
import { getTransactions, Transaction, addTransaction, deleteTransaction, updateTransaction } from "../functions/transactionFunctions"
import { EditForm } from "../../../components/EditForm"
import {CalandarModal} from "../../../components/CalanderModal"
import dayjs from "dayjs"

export const TransactionsSection = () => {
    const [transactions, setTransactions] = useState([] as Transaction[])
    const [editModalVisible, setEditModalVisible] = useState(false)
    const [objectToEdit, setObjectToEdit] = useState({})
    const [transactionId, setTransactionId] = useState("")
    const [addModalVisible, setAddModalVisible] = useState(false)

    const [calandarVisible,setCalandarVisible] = useState(false)
    const [date, setDate] = useState(dayjs())

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
            <EditForm 
                modalVisible={editModalVisible}
                setModalVisible={setEditModalVisible} 
                editObject={objectToEdit} 
                selectedId={transactionId}
                title={"Edit Transaction"} 
                submitFunction={updateTransaction} 
                showDelete={true}
                deleteFunction={deleteTransaction}
            />

            <EditForm
                modalVisible={addModalVisible}
                setModalVisible={setAddModalVisible}
                editObject={{"name": "Name...", "pay": 0, "date": "", "description": ""}}
                selectedId={""}
                title={"Add Transaction"}
                submitFunction={addTransaction}
                showDelete={false}
            >
                <Pressable onPress={() => {setCalandarVisible(true)}}>
                    <Text>{date.toString()}</Text>
                    <CalandarModal modalVisible={calandarVisible} setModalVisible={setCalandarVisible} date={date} setDate={setDate}/>
                </Pressable>
            </EditForm>

            <Widget title="Transactions" showAdd={true} addFunction={() => {setAddModalVisible(true)}}>
                <View>
                    {transactions.map((transaction) => (
                        <TouchableOpacity key={transaction._id} onPress={() => {setTransactionId(transaction._id); setObjectToEdit(transaction); setEditModalVisible(true)}}>
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