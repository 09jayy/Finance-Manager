import {useState, useEffect, SetStateAction, Dispatch} from "react"
import {View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity, StyleSheet} from "react-native"
import {getUserData, UserData} from "./functions"
import {Label} from "./components/Label"
import {CustomList} from "./components/CustomList"

export const SettingsPage = () => {
    const [userData, setUserData] : [UserData, Dispatch<SetStateAction<UserData>>] = useState({name: "", email: ""})
    const [loading, setLoading]= useState(true)

    useEffect( () => {
        getUserData().then(data => {
            setUserData(data)
            setLoading(false)
        }).catch( (error: Error) => {
            console.log(error)
        })
    }, [])

    return (
        <SafeAreaView>
            {
                loading ? (
                    <ActivityIndicator/> 
                ) : (
                    <View>
                    <CustomList title="Account">
                        <Label title="Name" value={userData.name}/>
                        <Label title="Email" value={userData.email}/>
                        <Label title="Password" value={"***********"}/>
                        <TouchableOpacity>
                            <Text style={{...styles.btn,color: "#077cdb"}}>Change details</Text>
                        </TouchableOpacity>
                    </CustomList>

                    <CustomList title="Actions">
                        <TouchableOpacity>
                            <Text style={{...styles.btn, color: "#077cdb"}}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{...styles.btn, color: "#f00707"}}>Delete Account</Text>
                        </TouchableOpacity>
                    </CustomList>
                    </View>
                )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    btn: {
        textAlign: "center",
        backgroundColor: "white",
        padding: 10,
        fontSize: 16
    }
})