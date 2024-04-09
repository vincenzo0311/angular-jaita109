import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Studente } from 'src/models/Studente';

@Component({
  selector: 'app-ricercastudente',
  templateUrl: './ricercastudente.component.html',
  styleUrls: ['./ricercastudente.component.css']
})
export class RicercastudenteComponent {
  ricercaNome? : string;
  studenti? : Studente[];
  @Output() search = new EventEmitter<Studente[]>();


  constructor(private http : HttpClient){
    this.http = http;
  }


  getStudentiByName(){
    let token = sessionStorage.getItem("token");
    if(token == null){
      token = "";
    }

    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'token': token as string
      }
    );

    if(this.ricercaNome == null){
      this.ricercaNome = "";
    }

    const params = new HttpParams().set('nome', this.ricercaNome);

    this.http.get<Studente[]>("http://localhost:8080/api/studente/searchByName", {headers, params}).subscribe(risposta =>{
      this.studenti = risposta;
      // console.log(this.studenti);
      this.search.emit(this.studenti);
    })
  }

  reset(){
    this.ricercaNome = "";
    this.getAllStudenti()
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
      this.search.emit(this.studenti);
    })
  }
}
