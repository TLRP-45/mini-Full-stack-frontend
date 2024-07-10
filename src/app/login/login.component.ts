import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;


  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ){
    this.loginForm = this.formBuilder.group({
      rut: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
  }


  public logIn(): void{
    if(this.loginForm.valid){
      const rut = this.loginForm.get('rut')?.value
      const password = this.loginForm.get('password')?.value
      this.loginService.login(rut, password).subscribe(response=>{
        if(response.authorized){
          this.router.navigateByUrl('home')
        }else{
          alert("Error: Cuenta incorrecta")
        }
      })
    }else{
      alert("Error: Debes ingresar un RUT válido y tu clave.")
    }
  }

  public register() {
    this.router.navigateByUrl('register')
  }

}
