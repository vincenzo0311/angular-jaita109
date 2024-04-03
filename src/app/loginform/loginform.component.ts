import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginStatus } from 'src/models/LoginStatus';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent {
  loginForm : FormGroup;

  constructor(private http : HttpClient, private formBuilder : FormBuilder){
    this.http = http;
    this.loginForm = formBuilder.group(
      {
        username : "",
        password : ""
      }
    )
  }


  submitForm(){
    const formValues = this.loginForm.value;
    //Compongo il body della richiesta prendendo i dati dai campi input del form e trasformandoli in JSON con il metodo JSON.stringify()
    const body = JSON.stringify(formValues);
    //Compongo gli headers della richiesta con le informzioni che servono (dico che sto comunicando con un JSON)
    const headers = new HttpHeaders(
      {'Content-Type' : 'application/json'}
    )
    
    //this.http permette di fare le richieste http al server e di ricevere le risposte
    //in questo caso essendo il server rest (quindi mi risponde a JSON) la mia risposta sarà un JSON che posso
    //utilizzare per graficare/gestire le varie situazioni
    this.http.post("http://localhost:8080/api/login/signin", body, {headers}).subscribe(risposta =>{
      console.log(risposta)


      let loginStatus : LoginStatus = risposta as LoginStatus;
      //In base al ruolo mandiamo su paginastudenti o su paginadirigenti

      if(loginStatus.ruolo != "NONE"){
        //Il sesssionStorage permette di salvare nel brawser alcune informazioni, noi ci salviamo il token
        //che utilizzeremo per fare tutte le richieste che richiedono un'autorizzazione
        sessionStorage.setItem("token", loginStatus.token);
        if(loginStatus.ruolo == "STUDENTE"){
          console.log("Vai alla pagina studenti");
          //windows.location.href permette di fare un redirect in automatico ad un url che specifichiamo come stringa
          window.location.href="/areastudenti";
        }
        else if(loginStatus.ruolo == "DIRIGENTE"){
          console.log("Vai alla pagina dirigenti");
          window.location.href="/areadirigenti";
  
        }
      }
      else{
        alert("ERRORE Username o password errate");
      }
      
    })

  }
}
