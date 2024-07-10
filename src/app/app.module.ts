import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DoTransactionsComponent } from './DoTransactions/DoTransactions.component';
import { SeeTransactionsComponent } from './seeTransactions/seeTransactions.component';
import { RegisterComponent } from './register/register.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { HttpClientModule } from '@angular/common/http';



const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} }


@NgModule({
  declarations: [				
    AppComponent,
    LoginComponent,
    HomeComponent,
    DoTransactionsComponent,
    SeeTransactionsComponent,
    RegisterComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
