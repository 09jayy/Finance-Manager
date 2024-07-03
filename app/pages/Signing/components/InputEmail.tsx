import {TextInput} from "react-native"

type EmailProps = {
    style: Object
    email: string
    setEmail: (email: string) => void
}

export const InputEmail = ({style, email, setEmail} : EmailProps) => {
    return <TextInput style = {style} placeholder="Email..." onChangeText={(value) => setEmail(value)} value={email}/>
}
