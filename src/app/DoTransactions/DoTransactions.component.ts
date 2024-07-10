import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { UpdateAccTransactionDTO } from '../DTO/UpdateAccTransaction.dto';

@Component({
  selector: 'app-DoTransactions',
  templateUrl: './DoTransactions.component.html',
  styleUrls: ['./DoTransactions.component.css']
})
export class DoTransactionsComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private route: ActivatedRoute,
  ) { 
    this.transForm = formBuilder.group({
      numAccountDestiny: ['', Validators.required],
      quantity: ['', Validators.required],
    })
    this.keyForm = formBuilder.group({
      verifyKey: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.numAccountSource = Number.parseInt(this.route.snapshot.paramMap.get('accNumber')!)
  }

  public numAccountSource: number = 0;
  public transForm: FormGroup;
  public keyForm: FormGroup;
  public showVerify: boolean = false;

  public sendVerifyKey() {
    if (this.transForm.valid) {
        this.showVerify = true;
    }else{
      alert('Por favor complete los datos')
    }
  }

  public verifyKey() {
    const verifyKeyForm = this.keyForm.get('verifyKey')?.value
    this.accountService.verifyTwoStepAuthCode(String(verifyKeyForm)).subscribe(response=>{
      if(response){
          this.doTransaction()
      }
      else {
        alert('La clave de verificación es incorrecta')
      }
    })
  }


  public doTransaction(): void {
    const transDTO: UpdateAccTransactionDTO= {idAccRemitent: this.numAccountSource, idAccReciver: this.transForm.get('numAccountDestiny')?.value, transAmountValue: this.transForm.get('quantity')?.value}
    this.accountService.doTransaction(transDTO).subscribe(response =>{
      alert('La transacción fue realizada con exito')
      this.router.navigateByUrl('home')
    }, error =>{
      console.log(error)
      alert("Algo salió mal.\nRevise si el número de la cuenta es correcto y si tienes suficiente saldo para transferir")
      this.router.navigateByUrl('home')
    })
  }

  public logOut(): void{
    if(this.loginService.logOut()){
      this.router.navigateByUrl('login')
    }
  }

}
