import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard, notLogged } from './guards/auth.guard';
import { DoTransactionsComponent } from './DoTransactions/DoTransactions.component';
import { SeeTransactionsComponent } from './seeTransactions/seeTransactions.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [notLogged]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'doTransactions/:accNumber',
    component: DoTransactionsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'latestTransactions/:accNumber',
    component: SeeTransactionsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [notLogged]
  },
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
