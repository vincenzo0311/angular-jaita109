import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Studente } from 'src/models/Studente';

@Component({
  selector: 'app-areastudenti',
  templateUrl: './areastudenti.component.html',
  styleUrls: ['./areastudenti.component.css']
})
export class AreastudentiComponent {
  //Proprietà studente che verrà valorizzata dalla risposta del server quando si supera il checkLogin()
  studente? : Studente;


  constructor(private http : HttpClient){
    this.http = http;
    this.checkLogin();
  }




  checkLogin(){
    let token = sessionStorage.getItem("token");
    if(token == null){
      alert("NON HAI EFFETTUATO UN LOGIN VALIDO")
      sessionStorage.clear();
      window.location.href="/";
      return;
    }
    else{
      const headers = new HttpHeaders(
        {
          'Content-Type' : 'application/json',
          'token' : token,
          'role' : 'STUDENTE'
        }
      );


      this.http.get("http://localhost:8080/api/login/checklogin", {headers}).subscribe(risposta =>{
        let check = risposta as boolean;
        if(!check){
          alert("Non sei autorizzato ad accedere a questa pagina");
          window.location.href="/";
        }
        else{
          let id  = token?.split("-")[1] as string;
          this.getStudente(id);
        }
      })

    }
  }

  getStudente(id : string){
    let token = sessionStorage.getItem("token");
    //Evitiamo di passare il token all'header con un null
    if(token == null){
      token = "";
    }

    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'token' : token
      }
    )

    const params = new HttpParams().set('idStudente', id);

    this.http.get("http://localhost:8080/api/studente/byId", {headers, params},).subscribe(risposta =>{
      console.log(risposta);
    
      this.studente = risposta as Studente;

      console.log(this.studente);
    })

  }


  logout(){
    //Svuoto la session dal token
    sessionStorage.clear();

    //Torno alla pagina principale
    window.location.href="/";
  }
}
