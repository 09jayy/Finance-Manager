import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginForm } from "./LoginForm"
import { SignUpForm } from "./SignupForm"
import { AntDesign } from '@expo/vector-icons';

//type AntDesignIconNames = "login" | "adduser"


const Tab = createBottomTabNavigator(); 

export const SignRoot = () =>{
    return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
            let iconName: "login" | "adduser" | undefined = undefined; 
            let iconColor; 

            if (route.name === 'Login') {
                iconName = "login";
            } else if (route.name === 'Sign Up') {
                iconName = "adduser"; 
            }

            iconColor = focused ? "blue" : "black"; 

            return <AntDesign name={iconName} size={22} color={iconColor} />;
            },
        }
    )}>
        <Tab.Screen name="Login" component={LoginForm}/>
        <Tab.Screen name="Sign Up" component={SignUpForm}/>
    </Tab.Navigator>
    ); 
} 