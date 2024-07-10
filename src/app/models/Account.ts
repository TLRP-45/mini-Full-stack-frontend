export class Account {
    public accNumber: number
    public type: string
    public cash: number
    public status: boolean
    constructor(accNumber: number, type: string, cash: number){
        this.accNumber = accNumber
        this.type = type
        this.cash = cash
        this.status = true
    }
}