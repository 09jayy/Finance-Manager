import { View, Text } from "react-native"
import {useState, useEffect} from "react"
import {getBankData} from "./functions/banksPageFunction"

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
            <Text>Banks Page</Text>
            <Text>{banks}</Text>
        </View>
    )
}