import dayjs from "dayjs"

export type Bank = {
    _id: string
    name: string
    balance: number
}

export type Transaction =  {
    _id: string
    date: dayjs.Dayjs
    name: string 
    description: string
    pay: number
    bank: string
}