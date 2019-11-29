import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ExtraRoutingModule } from './extra-routing.module';
import { ExtraComponent } from './extra.component';
import { ProfileComponent } from './profile/profile.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ExtraComponent, ProfileComponent, InscriptionComponent, LoginComponent],
  imports: [
    CommonModule,
    ExtraRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExtraModule { }
