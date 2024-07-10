import { Injectable, numberAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from './client.service';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router,
    private clientService: ClientService
  ) { }

  public login(r: number, p:string): Observable<{authorized: boolean}>{
  
    return this.clientService.getClientData().pipe(map((response: any) => {
      const clients= response
      const authorizedUser = clients.find((user:any)=> user.rut == r && user.password === p);
      
      if(authorizedUser){
        const token: string = btoa(r + ';' + p)
        sessionStorage.setItem('token', token)
        return { authorized: true}
      }
      else{
        return { authorized: false};
      }
    }))
  }

  public logOut(): boolean{
    if(sessionStorage.getItem('token')){
      sessionStorage.removeItem('token')
      return true
    }
  
    return false
  }
  
  public isLoggedIn(): Observable<boolean> {
    let token = sessionStorage.getItem('token')
    if (token){
      let user: string= atob(token)
      return of (true)
    }
  
    this.router.navigateByUrl('login')
    return of (false)
  }
  
  public isAlreadyLogged(): Observable<boolean>{
    let token = sessionStorage.getItem('token') 
    if (token) {
      this.router.navigateByUrl('home');
      
      return of (false);
    } 
  
    return of (true);
  }
  
}
