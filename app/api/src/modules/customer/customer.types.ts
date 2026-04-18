export interface CustomerDTO {
    userId: string,
    flag: boolean
}

export interface TransactionSchema {
   accountNumber: number,
   senderId: string,
   recieverId: string,
   funds: number
}
