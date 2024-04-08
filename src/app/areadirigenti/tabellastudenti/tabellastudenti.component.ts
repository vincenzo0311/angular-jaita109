import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Classe } from 'src/models/Classe';
import { Studente } from 'src/models/Studente';

@Component({
  selector: 'app-tabellastudenti',
  templateUrl: './tabellastudenti.component.html',
  styleUrls: ['./tabellastudenti.component.css']
})
export class TabellastudentiComponent {
  //Ricevo il vettore di studenti dal componente areadirigenti grazie a @Input
  @Input() studenti? : Studente[];
  @Input() classi? : Classe[];
  formInserisciStudente : FormGroup;

  isInserisciStudente = false;

  constructor(private http : HttpClient, private formBuilder : FormBuilder){
    this.http = http;

    //Inizializzo il FormGroup con i campi di input che mi interessano
    this.formInserisciStudente = formBuilder.group(
      {
        nome : "",
        cognome : "",
        datanascita : "",
        username : "",
        password : "",
        idclasse : ""
      }
    )
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

  toggleInserisciStudente(){
    // if(this.isInserisciStudente){
    //   this.isInserisciStudente = false;
    // }
    // else{
    //   this.isInserisciStudente = true;
    // }

    //In questo modo alterno il valore booleano della variabile, ad ogni chiamata di questo metodo la variabile alternerà il suo valore
    //questo mi permette di avere un solo metodo invocabile da più bottoni che servono a visualizzare/nascondere il componente
    this.isInserisciStudente = !this.isInserisciStudente;
  }


  // visualizzaInserisciStudente(){
  //   this.isInserisciStudente = true;
  // }

  // nascondiInserisciStudente(){
  //   this.isInserisciStudente = false;
  // }


  submitInserisciStudente(){
    const formValues = this.formInserisciStudente.value;
    const body = JSON.stringify(formValues);

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

    this.http.post<Studente>("http://localhost:8080/api/studente/insert", body, {headers}).subscribe(risposta =>{
      if(!risposta){
        alert("Errore durante l'esecuzione della richiesta");
      }
      else{
        //Potremmo ricaricare la pagina
        //window.location.href="/areadirigenti";
        this.studenti?.push(risposta);
      }
      
      //Tramite il metodo .patchValue() io posso passare un 'json' contente i valori di ogni input (ovviamente utilizzando come chiavi quello
      //che c'è scritto nell'attributo formControlName), questo quindi mi permette di cambiare dinamicamente i valori da codice     
      this.formInserisciStudente.patchValue(
        {
          nome : "",
          cognome : "",
          datanascita : "",
          username : "",
          password : "",
          idclasse : ""
        }
      )

      this.toggleInserisciStudente();

    })
  }
}
