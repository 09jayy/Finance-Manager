export type PasswordError = {
    reason: string | null
}

const hasSymbol = (password: string): boolean => {
    const symbols: Set<string> = new Set(["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]","|","\",",":",";","'","<",",",">",".","?","/",'"'])

    // must contain at least 1 symbol
    for (let i = 0; i < password.length; i++){
        if (symbols.has(password.charAt(i))){
            console.log("has: " + password.charAt(i))
            return true
        } 
    }
    return false
}

export const isEmailValid = (email: string): boolean => {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i
    return emailPattern.test(email)
}

export const isPasswordValid = (password: string): PasswordError => {

    // must be > 6 characters
    if (password.length < 6) { return {reason: "Password must be at least 6 characters"} }
    
    // must contain at least 1 symbol
    if (!hasSymbol(password)) {return {reason: "Password must contain at least one symbol"}}

    // upper and lower case characters
    if (password.toLowerCase() == password || password.toUpperCase() == password) {return {reason: "Password must contain at least 1 uppercase and lowercase letter"}}

    return {reason: null} 
}