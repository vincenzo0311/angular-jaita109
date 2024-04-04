import { Classe } from "./Classe";
import { Persona } from "./Persona";

//Oggetto studente che utilizzo quando ricevo i JSON studente dal server.
//trasformo i JSON in questo oggetto typescript 
export interface Studente extends Persona{
    classe : Classe
}