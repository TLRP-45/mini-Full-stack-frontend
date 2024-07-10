import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Account } from '../models/Account';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) { 
    this.newAccForm= formBuilder.group({
      type: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token')
    if (token){
      this.decodifyToken(token)
    }
  }

  public accounts: Account[] = []
  public fullname: string = ''
  public eMail: string = ''
  public phone: number = 0
  public rut: number = 0
  public clientId: number = 0
  public reqNewAcc: boolean = false
  public newAccForm: FormGroup

  public seeTransactions(accNumber: number): void{
    this.router.navigate(['/latestTransactions', accNumber])
  }

  public doTransactions(accNumber: number): void{
    this.router.navigate(['/doTransactions', accNumber])
  }

  public enableReqNewAcc(): void {
    this.reqNewAcc=true
  }

  public newAccount(): void {
    if(this.newAccForm.valid){
      var tipo: string;
      if (this.newAccForm.get('type')?.value == "Cuenta Corriente" || this.newAccForm.get('type')?.value == "Cuenta de Ahorro") {
        if (this.newAccForm.get('type')?.value == "Cuenta Corriente") {
          tipo = "Checking"
        }
        else {
          tipo = "Savings"
        }
        this.reqNewAcc = false
        this.clientService.newAccount(this.clientId, tipo).subscribe(response =>{
        alert('Su cuenta ha sido creada exitosamente')
        this.ngOnInit()
      })
      }
      else {
        alert('Selección de tipo de cuenta invalida')
      }
    }else{
      alert("Escoga un tipo de cuenta")
    }
  }

  public decodifyToken(token: string): void{
    const decodedToken= atob(token)
    const [rut, password]= decodedToken.split(';')
    this.clientService.getClientData().subscribe(client =>{
      const clientFound = client.find((user:any)=> user.rut == rut)
      this.fullname = clientFound.fullname
      this.eMail = clientFound.email
      this.phone = clientFound.phone
      this.rut = clientFound.rut
      this.clientId = clientFound.clientId
      this.clientService.getAccountsClient(this.clientId).subscribe(response =>{
        this.accounts = response
      })
    })
  }

  public accNumFormatting(accNumber: number): string {
    const accNumbertoString = String(accNumber)
    return accNumbertoString.replace(/(\d{4})(?=\d)/g, '$1-')
  }

  public typeFormatting(type: string): string {
    let typeShown: string = type
    if (type == "Checking") {
      typeShown = "Cuenta Corriente"
      return typeShown
    }
    else{
      typeShown = "Cuenta de Ahorro"
      return typeShown

    }
  }

  public logOut(): void{
    if(this.loginService.logOut()){
      this.router.navigateByUrl('login')
    }
  }

}
