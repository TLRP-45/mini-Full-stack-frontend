import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateAccTransactionDTO } from '../DTO/UpdateAccTransaction.dto';
import { AccountService } from '../services/account.service';
import { DoTransactionsComponent } from './DoTransactions.component';
import { HttpClientModule } from '@angular/common/http';


describe('DoTransactionsComponent', () => {
  let component: DoTransactionsComponent;
  let fixture: ComponentFixture<DoTransactionsComponent>;
  let loginService: LoginService
  let accountService: AccountService
  let router: Router
  let activatedRoute: ActivatedRoute

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoTransactionsComponent ],
      imports: [ ReactiveFormsModule, FormsModule , HttpClientModule],
      providers: [ {provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (key: string)=> 1} } } }, { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoTransactionsComponent);
    component = fixture.componentInstance;
    loginService= TestBed.inject(LoginService)
    accountService= TestBed.inject(AccountService)
    router= TestBed.inject(Router)
    activatedRoute= TestBed.inject(ActivatedRoute)
    fixture.detectChanges();
  });

  it('Crea componente', () => {
    expect(component).toBeTruthy();
  });

  it('Al iniciar se obtiene el numAccount de los parametros', () => {
    component.ngOnInit()
    expect(component.numAccountSource).toBe(1)
  })

  it('LLama al servicio loginService.logOut y navega a login', () => {
    spyOn(loginService, 'logOut').and.returnValue(true)

    component.logOut();

    expect(loginService.logOut).toHaveBeenCalled()
    expect(router.navigateByUrl).toHaveBeenCalledWith('login')
  })
});