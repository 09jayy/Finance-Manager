const isNumeric = (n: string) => {
    const date = new Date(n)
    if (!isNaN(date.getTime())) {
        return false
    }

    return !isNaN(parseFloat(n))
}

// Keys in the object that are empty are values that have not been edited by the user so are removed
export const removeBlank = (obj: {[key: string]: any}): Object => {
    let newObj: {[key: string]: any} = {} 

    Object.keys(obj).forEach(key => {
        console.log(obj[key])
        console.log(isNumeric(obj[key]))

        if(obj[key] != ""){
            newObj[key] = (isNumeric(obj[key])) ? parseFloat(obj[key]) : obj[key]
        }
    })

    return newObj
}