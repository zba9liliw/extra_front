import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"recruteur",loadChildren:'./recruteur/recruteur.module#RecruteurModule'},
  {path:"extra",loadChildren:'./extra/extra.module#ExtraModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
