import { View, Text } from "react-native"
import {useState, useEffect} from "react"
import {getBankData} from "./functions/banksPageFunction"
import {ParentWidget} from "../../components/ParentWidget"

export const BanksPage = () => {
    const [banks, setBanks] = useState([])

    useEffect(()=> {
        getBankData()
        .then(data => {
            console.log(data)
        })
    },[])

    return (
        <View>
            <ParentWidget title="BANKS" showAdd={true}>
                <Text>Banks will go here</Text>
            </ParentWidget>
        </View>
    )
}