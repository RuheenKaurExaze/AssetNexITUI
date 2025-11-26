import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboarduser',
  imports: [],
  templateUrl: './dashboarduser.component.html',
  styleUrl: './dashboarduser.component.css'
})
export class DashboarduserComponent {
constructor(private router: Router){}

goTo:any;
goToLanding()
{
  this.router.navigateByUrl('/landing');
}
}
