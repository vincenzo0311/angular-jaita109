import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreastudentiComponent } from './areastudenti/areastudenti.component';
import { AreadirigentiComponent } from './areadirigenti/areadirigenti.component';

const routes: Routes = [
  {
    //http://localhost:4200/areastudenti
    path: 'areastudenti',
    component: AreastudentiComponent
  },
  {
    //http://localhost:4200/areadirigenti
    path: 'areadirigenti',
    component: AreadirigentiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
