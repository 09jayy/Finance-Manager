import { useEffect, useState } from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { EditForm } from "../../../components/EditForm"
import { TitleValueWidget } from "../../../components/TitleValueWidget"
import { Widget } from "../../../components/Widget"
import { Bank, getBankData } from "../functions/banksPageFunction"
import { updateBank, deleteBank, addBank } from "../functions/bankAccountFunctions"

export const BankAccountSection = () => {
    const [banks, setBanks] = useState([] as Bank[])
    const [editModalVisible, setEditModalVisible] = useState(false)
    const [currentObject, setCurrentObject] = useState({})
    const [bankId, setBankId] = useState("")

    const [addModalVisible, setAddModalVisible] = useState(false)

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
                selectedId={bankId}
                title={"Edit Bank Account"} 
                submitFunction={updateBank} 
                showDelete={true}
                deleteFunction={deleteBank}
            />

            <EditForm
                modalVisible={addModalVisible}
                setModalVisible={setAddModalVisible}
                editObject={{"name": "Name...", "balance": 0}}
                selectedId={""}
                title={"Add Bank Account"}
                submitFunction={addBank}
                showDelete={false}
            />

            <Widget title="Bank Accounts" showAdd={true} addFunction={() => {setAddModalVisible(true)}}>
                <View style={styles.bankList}>
                    {banks.map((bank: Bank) => (
                        <TouchableOpacity key={bank._id} onPress={() => {
                            setCurrentObject(bank); 
                            setBankId(bank._id); 
                            setEditModalVisible(true)
                            }}
                        >
                            <TitleValueWidget title={bank.name} value={`£${bank.balance}`} key={bank._id} direction="column" styleProp={bankAccountStyles}/>
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