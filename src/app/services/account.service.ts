import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { Observable, of } from 'rxjs';
import { Transaction } from '../models/Transaction';
import { UpdateAccTransactionDTO } from '../DTO/UpdateAccTransaction.dto';
import { Account } from '../models/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private clientService: ClientService
  ) { }
  
  private apiUrl= 'http://localhost:3000/accounts'
  private twoStepAuthCode: string ='45681102'
  
  private transactions: Transaction[]=[
  ]
  
  public doTransaction(transDTO: UpdateAccTransactionDTO): Observable<any> {
    console.log(transDTO.idAccRemitent);
    const todayDate: Date = new Date()
    const yyyy: number = todayDate.getFullYear()
    const mm: string = String(todayDate.getMonth() + 1).padStart(2, '0')
    const dd: string = String(todayDate.getDate()).padStart(2, '0')
    const todayIs: string = `${yyyy}-${mm}-${dd}`
    this.transactions.push(new Transaction(this.transactions.length+1, todayIs, transDTO.transAmountValue, transDTO.idAccRemitent, transDTO.idAccReciver))
    this.clientService.getClientData().subscribe(response=>{
      for(let client of response){
        this.clientService.getAccountsClient(client.clientId).subscribe(response=>{
          for(let account of response){
            if(account.numAccount == transDTO.idAccRemitent){
              alert('Nueva Transferencia o Transacción\n Se ha realizado exitosamente una nueva transfetencia o Transacción de $'+transDTO.transAmountValue+ 'desde la cuenta'+transDTO.idAccRemitent+ 'a la cuenta'+transDTO.idAccReciver+'.');
            }
          }
        })
      }
    })
    return this.http.put<Transaction>(this.apiUrl + '/transaction', transDTO)
  }
  
  public verifyTwoStepAuthCode(twoStepAuthCode: string): Observable<boolean> {
    return of (this.twoStepAuthCode === twoStepAuthCode)
  }
  
  public seeTransactions(accNum: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl + '/latestTransactions/' + accNum)
  }
}
