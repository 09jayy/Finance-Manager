import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginForm } from "./LoginForm"
import { SignUpForm } from "./SignupForm"
import { AntDesign } from '@expo/vector-icons';

type SignRootTabParamList = {
    Login: undefined
    SignUp: undefined
}

const Tab = createBottomTabNavigator<SignRootTabParamList>(); 

export const SignRoot = () =>{
    return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
            let iconName: "login" | "adduser" | undefined = undefined; 

            if (route.name === 'Login') {
                iconName = "login";
            } else if (route.name === 'SignUp') {
                iconName = "adduser"; 
            }

            return <AntDesign name={iconName} size={size+2} color={color} />;
            },
            tabBarActiveTintColor: '#397dfa',
            tabBarInactiveTintColor: 'gray',
        }
    )}>
        <Tab.Screen name="Login" component={LoginForm}/>
        <Tab.Screen name="SignUp" component={SignUpForm}/>
    </Tab.Navigator>
    ); 
} 