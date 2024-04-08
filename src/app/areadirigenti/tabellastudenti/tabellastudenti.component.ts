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
  formModificaStudente : FormGroup;

  isInserisciStudente = false;
  isModificaStudente = false;

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

    this.formModificaStudente = formBuilder.group(
      {
        id : "",
        nome : "",
        cognome : "",
        datanascita : "",
        // username : "",
        // password : "",
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


  // visualizzaInserisciStudente(){
  //   this.isInserisciStudente = true;
  // }

  // nascondiInserisciStudente(){
  //   this.isInserisciStudente = false;
  // }
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

  toggleModificaStudente(){
    this.isModificaStudente = !this.isModificaStudente;
  }


  //Metodo che per ogni studente si occuperà di autocompletare i campi del form e anche di visualizzarlo
  modificaStudente(studente : Studente){
    this.formModificaStudente.patchValue(
      {
        id : studente.id,
        nome : studente.nome,
        cognome : studente.cognome,
        datanascita : studente.datanascita,
        // username : "",
        // password : "",
        idclasse : studente.classe.id
      }
    );

    this.isModificaStudente = true;
  }

  submitModificaStudente(){
    const formValues = this.formModificaStudente.value;
    const body = JSON.stringify(formValues);
    console.log("body update: ", body)
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

    this.http.post<boolean>("http://localhost:8080/api/studente/update", body, {headers}).subscribe(risposta =>{
      if(risposta){
        alert("Modifica avvenuta con successo");
        //Metodo alternativo per recuperare l'oggetto senza passare dal backend (nel senso che non me lo ritorna direttamente il backend)
        var stud : Studente = JSON.parse(body) as Studente;
        console.log("stud update", stud);

        //Cerco la classe tramite l'id che ho inserito all'interno del form con il tag select, per cercarla uso findIndex() sul vettore delle classi
        //e confronto ogni id con quello che c'è attualmente nel form di modifica, una volta trovata la classe la prendo come oggetto dal vettore e
        //la assegno alla proprietà 'classe' di Studente 'stud'
        var pos : number = this.classi?.findIndex(x => x.id == formValues.idclasse) as number;
        var classe : Classe = this.classi![pos];
        stud.classe = classe;

        //Cerco lo studente vecchio nel vettore studenti usando l'id dello studente che sto modificando
        //una volta trovata la posizione uso il metodo .splice() per sostituire l'elemento con uno nuovo cioe' con 'stud'
        pos = this.studenti?.findIndex(x => x.id == stud.id) as number;
        this.studenti?.splice(pos, 1, stud);
      }
      else{
        alert("Errore dureante la richiesta di modifica");
      }
    })
  }


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
