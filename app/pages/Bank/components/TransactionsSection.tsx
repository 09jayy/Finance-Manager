import { TouchableOpacity, View, StyleSheet, Pressable, Text } from "react-native"
import { Widget } from "../../../components/Widget"
import { TitleValueWidget } from "../../../components/TitleValueWidget"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import SelectDropdown from "react-native-select-dropdown"
import { getTransactions, Transaction, addTransaction, deleteTransaction, updateTransaction } from "../functions/transactionFunctions"
import { EditForm } from "../../../components/EditForm"
import {CalandarModal} from "../../../components/CalanderModal"
import dayjs from "dayjs"
import {styles} from "../../../styles/EditFormStyles"
import { Bank, getBankData } from "../functions/banksPageFunction"
import { AppDropdown } from "../../../components/AppDropdown"

type TransactionSectionProps = {
    banks: Bank[] 
    setBanks: Dispatch<SetStateAction<Bank[]>>
}

export const TransactionsSection = ({banks, setBanks}: TransactionSectionProps) => {
    const [transactions, setTransactions] = useState([] as Transaction[])
    const [editModalVisible, setEditModalVisible] = useState(false)
    const [objectToEdit, setObjectToEdit] = useState({} as Transaction)
    const [transactionIdToEdit, setTransactionIdToEdit] = useState("")
    const [addModalVisible, setAddModalVisible] = useState(false)

    const [calandarVisible,setCalandarVisible] = useState(false)
    const [date, setDate] = useState(dayjs())

    // BANK SELECT STATE
    const [bankSelectList, setBankSelectList] = useState<{ title: string; id: string; }[]>([])
    const [selectedId, setSelectedId] = useState("")

    useEffect(()=>{
        if (addModalVisible == false || editModalVisible == false){
            setBankSelectList(banks.map(bank => ({title: bank.name, id: bank._id})))

            getTransactions().then(response => {
                if (!response.ok){
                    return response.text().then(text => {throw new Error(text)})
                }

                return response.json()
            }).then(body => {
                setTransactions(body)
                getBankData()
                    .then( (data: Bank[]) => {
                        setBanks(data)
                    })
            }).catch( (error: Error) => {
                console.error(error.message)
            })
        }
    },[addModalVisible, editModalVisible])

    return (
        <View>
            <EditForm 
                modalVisible={editModalVisible}
                setModalVisible={setEditModalVisible} 
                editObject={objectToEdit} 
                selectedId={transactionIdToEdit}
                title={"Edit Transaction"} 
                submitFunction={updateTransaction} 
                showDelete={true}
                deleteFunction={deleteTransaction}
            >
                {/* DATE CALANDAR SELECT */}
                <Pressable onPress={() => {setDate(objectToEdit.date); setCalandarVisible(true)}}>
                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.input}>{date.format("ddd DD / MMM / YYYY")}</Text>
                    <View style={{backgroundColor: "black", width: "100%",height: 2, marginBottom: 10}}></View>
                    <CalandarModal modalVisible={calandarVisible} setModalVisible={setCalandarVisible} date={date} setDate={setDate}/>
                </Pressable>

                {/*  BANK ASSOCIATED SELECT */}
                <Text style={styles.label}>Bank</Text>
                <AppDropdown data={bankSelectList} setSelectedId={setSelectedId} defaultValue={bankSelectList.find(bank => bank.id == objectToEdit.bank)}/>
                <View style={{backgroundColor: "black", width: "100%",height: 2, marginBottom: 10}}></View>
            </EditForm>

            <EditForm
                modalVisible={addModalVisible}
                setModalVisible={setAddModalVisible}
                editObject={{"name": "Name...", "pay": 0, "date": date, "description": "Description...", "_id": ""}}
                selectedId={selectedId}
                title={"Add Transaction"}
                submitFunction={addTransaction}
                showDelete={false}
                date={date}
            >
                {/*  DATE CALANDAR SELECT */}
                <Pressable onPress={() => {setCalandarVisible(true)}}>
                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.input}>{date.format("ddd DD / MMM / YYYY")}</Text>
                    <View style={{backgroundColor: "black", width: "100%",height: 2, marginBottom: 10}}></View>
                    <CalandarModal modalVisible={calandarVisible} setModalVisible={setCalandarVisible} date={date} setDate={setDate}/>
                </Pressable>

                {/*  BANK ASSOCIATED SELECT */}
                <Text style={styles.label}>Bank</Text>
                <AppDropdown data={bankSelectList} setSelectedId={setSelectedId}/>
                <View style={{backgroundColor: "black", width: "100%",height: 2, marginBottom: 10}}></View>
            </EditForm>

            <Widget title="Transactions" showAdd={true} addFunction={() => {setDate(dayjs()); setAddModalVisible(true)}}>
                <View>
                    {transactions.map((transaction) => (
                        <TouchableOpacity key={transaction._id} onPress={() => {setTransactionIdToEdit(transaction._id); setObjectToEdit(transaction); setEditModalVisible(true)}}>
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