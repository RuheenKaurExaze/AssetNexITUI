import { Component } from '@angular/core';
import {AddSoftwareLicenseRequest} from '../models/add-software-model';
import {Router} from '@angular/router';
import { SoftwareLicenseService } from '../services/software.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-add-software-license',
  imports: [],
  templateUrl: './add-software-license.component.html',
  styleUrl: './add-software-license.component.css'
})


export class AddSoftwareLicenseComponent {

 model:AddSoftwareLicenseRequest;

 response: any;
  


  private addEDisposeAssetSubscription? : Subscription ;

constructor(private softwareLicenseService : SoftwareLicenseService, private router : Router  ) {
    
this.model = {
    
    Id: '',
    UserName: '',
    Request: '',
    EmployeeId: '',
    SoftwareName: '',
    OtherSoftware: '',
    DateApplied: '',
    };
  }

  goToSoftwareLicense()
  {
    this.router.navigateByUrl('/softwarelicense');
  }

  onFormSubmit() {
 

    alert('Your request has been sent to the admin.Kindly check your email for future updates!');

  
  }
    
 ngOnDestroy(): void {
   
   this?.addEDisposeAssetSubscription?.unsubscribe();
 }
}


