import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scuola-angular';
  isMainPage = false;

  constructor(private router : Router){
    //Con questo codice controlliamo se siamo 'atterrati' sulla pagina principale (cioe': "/")
    this.router.events.subscribe(evento =>{
      if(evento instanceof NavigationEnd){
        this.isMainPage = evento.urlAfterRedirects === "/"
      }
    })
  }
}
