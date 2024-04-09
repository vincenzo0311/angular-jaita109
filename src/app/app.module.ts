import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginformComponent } from './loginform/loginform.component';
import { AreadirigentiComponent } from './areadirigenti/areadirigenti.component';
import { AreastudentiComponent } from './areastudenti/areastudenti.component';
import { TabellastudentiComponent } from './areadirigenti/tabellastudenti/tabellastudenti.component';
import { RicercastudenteComponent } from './areadirigenti/ricercastudente/ricercastudente.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    AreadirigentiComponent,
    AreastudentiComponent,
    TabellastudentiComponent,
    RicercastudenteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,     //Modulo che ci fornisce le funzionlità per fare le richieste http
    ReactiveFormsModule,  //Modulo che ci fornisce i form interattivi
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
