import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:String;
  password:String;
  validation:string;
  recruiter:any;
  error:string;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }


  onSubmit()
  {
    const user = {
      email : this.email,
      password : this.password
    }
      if(!this.email || !this.password){
        this.validation = 'Mail and Password are required';
      } else {
     
        this.authService.authenticateClient(user).subscribe(data =>{
          if(data.success){
             this.authService.storeUserData(data.token, data.client);
            this.router.navigate(['/recruteur/profile']); 
   
          } else{
            this.error = data.msg ;
          }
         });
        }    
    }
  

}
