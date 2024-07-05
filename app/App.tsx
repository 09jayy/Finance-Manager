// import { StatusBar } from 'expo-status-bar';
import {useState, useEffect, useMemo} from "react"
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignRoot } from "./pages/Signing/SignRoot";
import AsyncStorage from "@react-native-async-storage/async-storage"
import {loginContext} from "./AppContext"
import {Home} from "./pages/Home/Home"

const Stack = createNativeStackNavigator(); 

const getLoggedIn = async (): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem("token")
    return token != null ? true : false
  } catch (e){
    return false
  }
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  getLoggedIn().then(data => { setLoggedIn(data) })

  return (
    <loginContext.Provider value={{loggedIn, setLoggedIn}}>
      <NavigationContainer>
        <Stack.Navigator>
          { loggedIn == false ? (
            <Stack.Group>
              <Stack.Screen name="SignRoot" component={SignRoot} options={ { headerShown: false}}/>
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="Home" component={Home}/> 
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </loginContext.Provider>
  )
}
