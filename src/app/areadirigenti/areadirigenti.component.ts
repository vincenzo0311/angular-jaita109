import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Classe } from 'src/models/Classe';
import { Dirigente } from 'src/models/Dirigente';
import { Studente } from 'src/models/Studente';

@Component({
  selector: 'app-areadirigenti',
  templateUrl: './areadirigenti.component.html',
  styleUrls: ['./areadirigenti.component.css']
})
export class AreadirigentiComponent {
  dirigente? : Dirigente;
  studenti? : Studente[];
  classi? : Classe[];
  
  constructor(private http : HttpClient){
    this.http = http;
    this.checkLogin();
  }

  getDirigente(id : string){
    let token = sessionStorage.getItem("token");
    if(token == null){
      token = "";
    }

    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'token' : token
      }
    );

    const params = new HttpParams().set('idDirigente', id);
    
    //Se voglio posso dire a typscript di prendere la risposta dal servere direttamente come il tipo dato che gli passo
    //tra le angolari. senza fare la conversione dopo.
    this.http.get<Dirigente>("http://localhost:8080/api/dirigente/byId", {headers, params}).subscribe(risposta =>{
      // this.dirigente = risposta as Dirigente;
      this.dirigente = risposta;
    })
  }

  getAllStudenti(){
    let token = sessionStorage.getItem("token");
    if(token == null){
      token = "";
    }
    
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'token' : token,
      }
    )

    this.http.get<Studente[]>("http://localhost:8080/api/studente/all", {headers}).subscribe(risposta =>{
      this.studenti = risposta;
    })
  }

  getAllClassi(){
    let token = sessionStorage.getItem("token");
    if(token == null){
      token = "";
    }
    
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'token' : token,
      }
    );

    this.http.get<Classe[]>("http://localhost:8080/api/classe/all", {headers}).subscribe(risposta =>{
      this.classi = risposta;
      // console.log(this.classi);
    })
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
      //Compongo gli headers della richiesta, inserendo il token e il ruolo che mi aspetto 
      //(in questo caso DIRIGENTE perchè sto accedendo alla pagina dei dirigenti)
      const headers = new HttpHeaders(
        {
          'Content-Type' : 'application/json',
          'token' : token,
          'role' : 'DIRIGENTE'
        }
      );

      this.http.get("http://localhost:8080/api/login/checklogin", {headers}).subscribe(risposta =>{
        let check = risposta as boolean;
        if(!check){
          alert("Non sei autorizzato ad accedere a questa pagina")
          window.location.href="/";
        }
        else{
          let id  = token?.split("-")[1] as string;
          
          //richieste per informazini necessarie
          this.getDirigente(id);
          this.getAllStudenti();
          this.getAllClassi();
        }
      })
    }
  }

  logout(){
    sessionStorage.clear()
    window.location.href="/";
  }
}
