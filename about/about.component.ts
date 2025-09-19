import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { __makeTemplateObject } from 'tslib';

@Component({
  selector: 'app-about',
  imports: [CommonModule,RouterModule, FormsModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  constructor (private router: Router){}

goToLanding()
{
this.router.navigateByUrl('/landing');
};

goToDashboard()
{
  this.router.navigateByUrl('/dashboard');
}

goToUinew()
{
  this.router.navigateByUrl('/uinew');
}

goToContact()
{
  this.router.navigateByUrl('/contact');

}

goToAuth()
{
  this.router.navigateByUrl('/login');
}

goToReport()
{
  this.router.navigateByUrl('/reports');
}

goToSoftwareLicense()
{
  this.router.navigateByUrl('/software-license');
}

goToHelpPage()
{
  this.router.navigateByUrl('/helppage');
}

goToLayout()
{
  this.router.navigateByUrl('/layout');
}

goToLiveTracking()
{
  this.router.navigateByUrl('/live-tracking');
}

goToSupport()
{
  this.router.navigateByUrl('/assets/support');
}

}


