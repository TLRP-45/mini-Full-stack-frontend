/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has user and password in the form', () => {
    expect(component.loginForm.contains('rut')).toBeTruthy()
    expect(component.loginForm.contains('password')).toBeTruthy()
  })

  it('User is Required', () => {
    const user = component.loginForm.get('rut')
    if(user){
      user.setValue('')
      expect(user.valid).toBeFalsy()
    } else {
      fail('Error: Debes ingresar un RUT válido.')
    }
  })

  it('Password is Required', () => {
    const user = component.loginForm.get('password')
    if(user){
      user.setValue('')
      expect(user.valid).toBeFalsy()
    } else {
      fail('Error: Debes ingresar tu clave.')
    }
  })
});
