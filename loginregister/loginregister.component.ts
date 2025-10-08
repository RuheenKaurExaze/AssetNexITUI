import { Component } from '@angular/core';
import { AuthService} from '../app/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-loginregister',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: 'loginregister.component.html',
  styleUrl: 'loginregister.component.css'
})
export class LoginregisterComponent {
constructor(private authService: AuthService, private router:Router){}

email:string ='';
password:string ='';
message:string= '';
errors:string[]=[];
goTo:any;


onRegister()
{
  this.authService.register(this.email,this.password).subscribe({
   next:(res) =>{
    if(res.success){
      this.message= res.message|| 'Registration successful!';
this.errors=[];
    }else{
      this.errors=res.errors || ['Registration unsuccessful!']
    }
    },
    error: (err) => {
        this.errors = ['Something went wrong: ' + (err.error?.message || err.statusText)];
      }
    });
  }

  goToLanding()
  {
    this.router.navigateByUrl('/landing');

  }
}


