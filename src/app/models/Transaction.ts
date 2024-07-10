export class Transaction {
    public id: number
    public date: string
    public amount: number
    public accNum: number
    public clientId: number
    constructor(id: number, date: string, amount: number, accNum: number, clientId: number){
        this.id = id
        this.date = date
        this.amount = amount
        this.accNum = accNum
        this.clientId = clientId
    }
  }
  