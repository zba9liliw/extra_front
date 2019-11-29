
import {AbstractControl} from '@angular/forms';

export function passValidation(control : AbstractControl){
    if(control && (control.value !== null || control.value !== undefined)){
      const cpass =  control.value ;
      const pass = control.root.get('password');
      if(pass){
        const passVal = pass.value ;
        if(passVal != cpass ){
          return {
            isError : true
          }
        }
      }
  
    }
    return null ; 
  }


  export function emailValidation(control : AbstractControl){
    if(control && (control.value !== null || control.value !== undefined)){
      const regex = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
      if(!regex.test(control.value)){
          return {
            isError : true
          }
        }
      
  
    }
    return null ; 
  }