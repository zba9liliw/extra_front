import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {passValidation, emailValidation} from '../../services/validation';
import { Extra } from '../extra';
import { AuthService } from 'src/app/services/auth.service';
import { ExtraService } from 'src/app/services/extra/extra.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  submitted = false;
  extraForm: FormGroup;

  errorExtra: string;
  User:any;


  constructor(private formBuilder: FormBuilder,private authService:AuthService,
    private extraService:ExtraService,private router:Router) { }

  ngOnInit() {
    this.extraForm = this.formBuilder.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern("[a-zA-Z ]*")
      ]),
      lastName: new FormControl('', [
        Validators.required,
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
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      cpassword: new FormControl('', [
        Validators.required,
        passValidation,
      ]),

    });

    this.extraForm.controls.password.valueChanges
      .subscribe(
        x => this.extraForm.controls.cpassword.updateValueAndValidity()
      );
  }

  // convenience getter for easy access to form fields
  get f() { return this.extraForm.controls; }

  onSubmit() {
    this.submitted=true;
    if (this.extraForm.valid) {
      this.User = this.extraForm.value;
      console.log(this.User)
           this.User.type = false
      this.extraService.registerUser(this.User).subscribe(data => {
        if (data.success) {
          this.authService.authenticateUser(this.User).subscribe(data => {
            if (data.success) {
              this.authService.storeUserData(data.token, data.user);
              this.router.navigate(['/extra/profile']);

            } else {
              console.log("error authentificating user")
              this.errorExtra = data.msg;

            }
          });
        } else {
          console.log("error registring");
          console.log(data);
          this.errorExtra = data.msg + "\n" + "Email ou Telephone existant";
        }
      });
    } else if (this.extraForm.invalid) {
      return;
    }
  }

  onReset() {
    this.submitted = false;
    this.extraForm.reset();
  }

  /*
  onClickSubmit(formData) {
    console.log('Your Email is : ' + JSON.stringify(formData));
  }
  */
}