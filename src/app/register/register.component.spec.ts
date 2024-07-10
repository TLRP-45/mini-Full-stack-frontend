/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RegisterComponent } from './register.component';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let clientService: ClientService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    clientService= TestBed.inject(ClientService)
    router= TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('Crea componente', () => {
    expect(component).toBeTruthy();
  });

  it('El formulario es incorrecto cuando los campos estan vacios', () => {
    expect(component.registerForm.valid).toBeFalsy()
  })

  it('El formulario es correcto cuando los campos estan rellenados correctamente', () => {
    component.registerForm.setValue({
      fullname: 'Hernán Vazque Lorca',
      email: 'hvazque123@gmail.com',
      phone: 966040000,
      password: 'p4ssK3yEx4mpl3',
      rut: 211614000
    })
    expect(component.registerForm.valid).toBeTruthy()
  })

  it('LLama a clientService.saveClientData cuando el formulario es correcto', () => {
    const getClientDataSpy = spyOn(clientService, 'getClientData').and.returnValue(of([]))
    const saveClientDataSpy = spyOn(clientService, 'saveClientData').and.returnValue(of())
    const routerSpy = spyOn(router, 'navigateByUrl')

    component.registerForm.setValue({
      fullname: 'Hernán Vazque Lorca',
      email: 'hvazque123@gmail.com',
      phone: 966040000,
      password: 'p4ssK3yEx4mpl3',
      rut: 211614000
    })

    component.register()

    expect(getClientDataSpy).toHaveBeenCalled()
    getClientDataSpy.calls.mostRecent().returnValue.subscribe(() => {
      expect(saveClientDataSpy).toHaveBeenCalled()
      expect(routerSpy).toHaveBeenCalledWith('login')
    })
  })

  it('Se muestra una alerta si el formulario esta vacio', () => {
    spyOn(window, 'alert')
    component.registerForm.setValue({
      fullname: '',
      email: '',
      phone: 0,
      password: '',
      rut: 0
    })

    component.register()

    expect(window.alert).toHaveBeenCalledWith('Por favor rellene los datos requeridos')
  })

  it('Se muestra una alerta si ya hay un usuario con el mismo rut registrado', () => {
    const getClientDataSpy = spyOn(clientService, 'getClientData').and.returnValue(of([{ rut: 211614000 }]))

    spyOn(window, 'alert');
    component.registerForm.setValue({
      fullname: 'Hernán Vazque Lorca',
      email: 'hvazque123@gmail.com',
      phone: 966040000,
      password: 'p4ssK3yEx4mpl3',
      rut: 211614000
    });

    component.register()

    expect(getClientDataSpy).toHaveBeenCalled()
    getClientDataSpy.calls.mostRecent().returnValue.subscribe(() => {
      expect(window.alert).toHaveBeenCalledWith('Ya hay un cliente registrado con ese mismo RUT')
    })
  })
});
