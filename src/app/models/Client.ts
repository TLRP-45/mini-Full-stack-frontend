export class Client {
    public password: number
    public eMail: string
    public phone: number
    public rut: number
    public status: boolean
    public idClient: number
    public name: string
    constructor(password: number, eMail: string, phone: number, rut: number, status: boolean, idClient: number, name: string){
        this.password=password
        this.eMail=eMail
        this.phone=phone
        this.rut=rut
        this.status=status
        this.idClient=idClient
        this.name=name
    }
}