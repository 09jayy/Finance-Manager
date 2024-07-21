import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { EditForm } from "../../../components/EditForm"
import { TitleValueWidget } from "../../../components/TitleValueWidget"
import { Widget } from "../../../components/Widget"
import { getBankData } from "../functions/banksPageFunction"
import { updateBank, deleteBank, addBank } from "../functions/bankAccountFunctions"
import { Bank } from "../../../types/types"
import { homeContext } from "../../Home/HomeContext"

export const BankAccountSection = () => {
    const [editModalVisible, setEditModalVisible] = useState(false)
    const [currentObject, setCurrentObject] = useState({})
    const [bankId, setBankId] = useState("")
    const [addModalVisible, setAddModalVisible] = useState(false)
    const {banks, setBanks} = useContext(homeContext)

    useEffect(()=> {
        if (editModalVisible == false || addModalVisible == false){
            getBankData()
                .then( (data: Bank[]) => {
                    setBanks(data)
                })
        }
    },[editModalVisible, addModalVisible])

    return (
        <View>
            <EditForm 
                modalVisible={editModalVisible} 
                setModalVisible={setEditModalVisible} 
                editObject={currentObject} 
                params={{bankId: bankId, transactionId: ""}}
                title={"Edit Bank Account"} 
                submitFunction={updateBank} 
                showDelete={true}
                deleteFunction={deleteBank}
            />

            <EditForm
                modalVisible={addModalVisible}
                setModalVisible={setAddModalVisible}
                editObject={{"name": "Name...", "balance": 0}}
                params={{bankId: "", transactionId: ""}}
                title={"Add Bank Account"}
                submitFunction={addBank}
                showDelete={false}
            />

            <Widget title="Bank Accounts" showAdd={true} addFunction={() => {setAddModalVisible(true)}}>
                <View>
                    {banks.map((bank: Bank) => (
                        <TouchableOpacity key={bank._id} onPress={() => {
                            setCurrentObject(bank); 
                            setBankId(bank._id); 
                            setEditModalVisible(true)
                            }}
                        >
                            <TitleValueWidget title={bank.name} value={(bank.balance > 0) ? `£${bank.balance.toLocaleString()}` : `-£${bank.balance.toLocaleString()}`} key={bank._id} direction="column" styleProp={bankAccountStyles}/>
                        </TouchableOpacity>
                    ))}
                </View>
            </Widget>
        </View>
    )
}

const bankAccountStyles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "500"
    },
    value: {
        fontSize: 16
    }
})