import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {passValidation, emailValidation} from '../../services/validation';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { RecruiterService } from 'src/app/services/recruiter/recruiter.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  clientForm:FormGroup;
  Client:any;
  errorClient:string;
  constructor(private router:Router,private formBuilder:FormBuilder,private recruiterService:RecruiterService,
    private authService:AuthService) { }

  ngOnInit() {

    this.clientForm = this.formBuilder.group({
      firstName: new FormControl('',
        [Validators.required,
        Validators.pattern("[a-zA-Z ]*")
        ]),
      lastName: new FormControl('', [Validators.required,
      Validators.pattern("[a-zA-Z ]*")
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      tel: new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9]{8}"),
        Validators.min(10000000),
        Validators.max(99999999)
      ]),
      adress: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      cpassword: new FormControl('', [
        Validators.required,
        passValidation,
      ]),
    });
    this.clientForm.controls.password.valueChanges.subscribe(
      x => this.clientForm.controls.cpassword.updateValueAndValidity()
    )
  }
  onSubmit() {
    if (this.clientForm.valid) {
      this.Client = this.clientForm.value;
      this.Client.type = true;
      this.recruiterService.registerClient(this.Client).subscribe(data => {
        if (data.success) {
          this.authService.authenticateClient(this.Client).subscribe(data => {
            if (data.success) {
              this.authService.storeUserData(data.token, data.client);
              this.router.navigate(['/recruteur/profile']);
            } else {
              console.log("error authentificating client")
              this.errorClient = data.msg;
            }
          });
        } else {
          console.log("error registring");
          this.errorClient = data.msg + "\n" + "Email ou telephone existant";
        }
      });
    } else if (this.clientForm.invalid) {
      console.log("Form Invalid")
      return;
    }
  }

}
