import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { RecruteurRoutingModule } from './recruteur-routing.module';
import { RecruteurComponent } from './recruteur.component';
import { ProfileComponent } from './profile/profile.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [RecruteurComponent, ProfileComponent, InscriptionComponent, LoginComponent],
  imports: [
    CommonModule,
    RecruteurRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecruteurModule { }
