import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Client } from '../models/Client';
import { CreateClientDto } from '../DTO/CreateClient.dto';
import { Account } from '../models/Account';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }

  private apiUrl= 'http://localhost:3000/Client/'
  
  public getClientData(): Observable<any>  {
    return this.http.get<any>(this.apiUrl)
  }
  
  public saveClientData(createClientDto: CreateClientDto): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, createClientDto)
  }
  
  public editClientData(clientId: number, client: Partial<Client>): Observable<any> {
    return this.http.put<Client>(this.apiUrl + clientId, client)
  }
  
  public newAccount(clientId: number, typeAcc: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + clientId + '/Create_Account/' + typeAcc, null)
  }
  
  public getAccountsClient(clientId: number): Observable<any> {
    return this.http.get<Account[]>(this.apiUrl + clientId + '/Get_Accounts')
  }
}
