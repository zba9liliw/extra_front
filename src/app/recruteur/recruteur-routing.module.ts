import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecruteurComponent } from './recruteur.component';
import { ProfileComponent } from './profile/profile.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:"",component:RecruteurComponent
  //,children:[
    //{path:"profile",component:ProfileComponent}
 // ]
},
{path:"profile",component:ProfileComponent},
{path:"inscription",component:InscriptionComponent},
{path:"login",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruteurRoutingModule { }
