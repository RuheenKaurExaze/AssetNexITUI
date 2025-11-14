import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SoftwareLicense} from './models/software-model';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';
import { SoftwareLicenseService } from './services/software.service';
import {of} from 'rxjs';
import { map } from 'rxjs/operators';
import {TableModule} from 'primeng/table' ;
import {SharedModule} from 'primeng/api';


@Component({
  selector: 'app-software-license',
  imports: [FormsModule, CommonModule,SharedModule,TableModule],
  templateUrl: './software-license.component.html',
  styleUrl: './software-license.component.css'
})


export class SoftwareLicenseComponent implements OnInit {

  model:SoftwareLicense;
  data:any;
  goTo:any;

  licenses$? : Observable<SoftwareLicense[]>= of([]);
  
  private softwarelicenseSubscription? : Subscription ;

  constructor(private router : Router, private softwareLicenseService : SoftwareLicenseService) {
    this.model={
    id: '',
    userName: '',
    request: '',
    employeeId: '',
    softwareName: '',
    otherSoftware: '',
    dateApplied: '',
    }
  }
 
        
  ngOnInit(): void 
{
this. licenses$=this.softwareLicenseService.getSoftwareLicense();
   
   }


   AddSoftwareLicense()
   {
   this.router.navigateByUrl('/softwarelicense/add');
   }

   onFormSubmit()
   {
    alert('Your request has been sent to the admin.Kindly check your email for future updates!')
   }

   goToDashboard()
   {
    this.router.navigateByUrl('/dashboard');
   }

   
goToLanding(){
  this.router.navigateByUrl('/landing');
  
}

  }


  

   
 






   


