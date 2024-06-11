import {TextInput, StyleSheet} from "react-native"

type EmailProps = {
    style: Object
}

export const InputEmail = ({style} : EmailProps) => {
    return <TextInput style = {style} placeholder="Email"/>
}
