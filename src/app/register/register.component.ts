import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';
import { CreateClientDto } from '../DTO/CreateClient.dto';
import { Client } from '../models/Client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) { 
    this.registerForm= this.formBuilder.group({
      rut: ['', [Validators.required, Validators.pattern('^[0-9]{8,12}$')]],
      fullname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]]
    });
  }

  ngOnInit() {
  }

  public registerForm: FormGroup;

  public register(): void {
    if(this.registerForm.valid){
      const rut = this.registerForm.get('rut')?.value
      const createClientDto: CreateClientDto= {fullname: this.registerForm.get('fullname')?.value, password: this.registerForm.get('password')?.value, email: this.registerForm.get('email')?.value, phone: this.registerForm.get('phone')?.value, rut: this.registerForm.get('rut')?.value, status: true}
      this.clientService.getClientData().subscribe(response =>{
        const clients= response
        if(!clients.find((client: Client) => client.rut == rut)){
          this.clientService.saveClientData(createClientDto).subscribe(response =>{
            console.log(response)
          })
          alert("El cliente ha sido registrado")
          this.router.navigateByUrl('login')
        }else{
          alert("Ya hay un cliente registrado con el RUT que ingreso")
        }
      })
    }else{
      alert("Por favor complete los datos requeridos")
    }
  }

}
