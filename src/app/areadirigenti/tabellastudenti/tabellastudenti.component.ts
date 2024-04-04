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
}
