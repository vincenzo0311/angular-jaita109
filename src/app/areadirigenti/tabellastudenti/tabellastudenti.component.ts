import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Studente } from 'src/models/Studente';

@Component({
  selector: 'app-tabellastudenti',
  templateUrl: './tabellastudenti.component.html',
  styleUrls: ['./tabellastudenti.component.css']
})
export class TabellastudentiComponent {
  //Ricevo il vettore di studenti dal componente areadirigenti grazie a @Input
  @Input() studenti? : Studente[];

  constructor(private http : HttpClient){
    this.http = http;
  }


  deleteStudente(id : number){
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

    const params = new HttpParams().set('idStudente', id);
    
    this.http.get<boolean>("http://localhost:8080/api/studente/delete", {headers, params}).subscribe(risposta =>{
      if(risposta){
        alert("eliminazione avvenuta con successo");
        // window.location.href="/areadirigenti";

        //Cerco la posizione dell'elemento con l'id cercato
        //findIndex() eseguirà un'iterazione su tutti gli elementi del vettore applicando il codice che gli ho scritto
        //dopo la freccetta (=>) se quel codice da come risultato 'true', findIndex() si interrempe 
        //e ritorna la posizione nel vettore in cui si trovava
        let pos = this.studenti?.findIndex(x => x.id === id)
        if(pos! > -1){
          this.studenti?.splice(pos!, 1);
        }
      }
    })

  }
}
