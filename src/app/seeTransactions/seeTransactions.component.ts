import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../models/Transaction';

@Component({
  selector: 'app-seeTransactions',
  templateUrl: './seeTransactions.component.html',
  styleUrls: ['./seeTransactions.component.css']
})
export class SeeTransactionsComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { 
    this.dateForm = formBuilder.group({
      initialDate: ['', Validators.required],
      endDate: ['', Validators.required]
    })
    this.initialFilterDate = new Date()
    this.endFilterDate = new Date()
  }

  ngOnInit() {
    this.accNum = Number.parseInt(this.route.snapshot.paramMap.get('accNumber')!)
    this.getTransactions()
  }

  public transactions: Transaction[]= []
  public filtredTransactions: Transaction[]= []
  public dateForm: FormGroup
  public initialFilterDate: Date
  public endFilterDate: Date
  public accNum: number = 0

  public restartFilter(): void{
    this.filtredTransactions=[]
    this.getTransactions()
  }

  public filterTransByDate(): void {
    const filteredTransacciones = this.transactions.filter(transaction => {
      let dateRange = new Date(transaction.date)
      this.initialFilterDate = new Date(this.dateForm.get('initialDate')?.value)
      this.endFilterDate = new Date(this.dateForm.get('endDate')?.value)
      return dateRange >= this.initialFilterDate && dateRange <= this.endFilterDate
    })
    this.filtredTransactions = filteredTransacciones
  }

  public getTransactions(): void{
    this.transactions = []
    console.log(this.accountService.seeTransactions(this.accNum));
    this.accountService.seeTransactions(this.accNum).subscribe(transaction=>{
          this.transactions = transaction
      })
  }
  
  public logOut(): void{
    if(this.loginService.logOut()){
      this.router.navigateByUrl('login')
    }
  }

}
