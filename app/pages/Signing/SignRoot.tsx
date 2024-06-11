import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SignInForm } from "../Signing/SignIn"
import { SignUpForm } from "../Signing/SignUp"

const Tab = createBottomTabNavigator(); 

export const SignRoot = () =>{
    return (
    <Tab.Navigator screenOptions={ { headerShown: false}}>
        <Tab.Screen name="SignIn" component={SignInForm}/>
        <Tab.Screen name="SignUp" component={SignUpForm}/>
    </Tab.Navigator>
    ); 
} 