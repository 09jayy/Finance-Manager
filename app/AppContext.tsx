import { Dispatch, SetStateAction, createContext } from 'react';

interface LoginContextType {
    loggedIn: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>> | undefined;
}

export const loginContext = createContext<LoginContextType>({
    loggedIn: false,
    setLoggedIn: undefined
})