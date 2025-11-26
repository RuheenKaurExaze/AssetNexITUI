

import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from '../landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InventoryComponent } from '../inventory/inventory.component';
import { LoginComponent } from './login/login.component';
import { AddAssetComponent } from '../inventory/add-asset/add-asset.component';
import { SupportComponent } from '../support/support.component';
import { EDisposeComponent } from '../e-dispose/e-dispose.component';
import { SoftwareLicenseComponent } from './software-license/software-license.component';
import { UpdateEdisposeComponent } from '../e-dispose/update-edispose/update-edispose.component';
import { AddSoftwareLicenseComponent } from './software-license/add-software-license/add-software-license.component';
import { AddEdisposeComponent } from '../e-dispose/add-edispose/add-edispose.component';
import { AboutComponent } from '../about/about.component';
import { HardwareComponent } from '../support/hardware/hardware.component';
import { HardwareGridComponent } from '../support/hardware/hardware-grid/hardware-grid.component';
import { SupportTableComponent } from '../support/support-table/support-table.component';
import { GuidelinesComponent } from '../e-dispose/guidelines/guidelines.component';
import { HelppageComponent } from '../helppage/helppage.component';
import { DeleteAssetComponent } from '../inventory/delete-asset/delete-asset.component';
import { UinewComponent } from './dashboard/uinew/uinew.component';
import { ReportsComponent } from './reports/reports.component';
import { LiveTrackingComponent } from '../live-tracking/live-tracking.component';
import { LoginauthComponent } from './loginauth/loginauth.component';
import { RealAlertsComponent } from './real-alerts/real-alerts.component';
import { authGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LiveMapComponent } from '../live-tracking/livemap.component';
import { TokenInterceptor } from './auth/auth.interceptor';
import { LogoutComponent } from '../logout/logout.component';
import { DashboarduserComponent } from '../dashboarduser/dashboarduser/dashboarduser.component';
import { UsersupportComponent } from '../user/usersupport/usersupport.component';
export const appRoutes: Routes =
 [

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'assets', component: InventoryComponent },
   
    ]
  },

    {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'ewaste/disposable-assets', component: EDisposeComponent },
   
    ]
  },

    {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'newsupport', component: SupportTableComponent },
   
    ]
  },
  
    { 
    path: 'landing',
    component: LandingComponent
   },
{
  path:'realalerts',
  component:RealAlertsComponent
},
   
    { 
    path: 'livetracking',
    component: LiveTrackingComponent
   },

   {
    path:'livemap',
    component: LiveMapComponent
   },

   {
     path:'reports',
     component:ReportsComponent
   },
   
   {
    path:'about',
    component:AboutComponent
   },

     { 
    path: 'login',
    component: LoginComponent,
   },

   {
    path:'login/auth',
    component: LoginauthComponent,
   },


   { 
    path: 'landing/navbar',
    component: NavbarComponent
   },

  { 
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[authGuard],
   },

{
  path:'dashboarduser',
  component:DashboarduserComponent,
canActivate:[authGuard],
},
  { 
    path: '', 
    redirectTo: 'landing', 
    pathMatch: 'full'
   },

   { 
    path: 'assets',
    component: InventoryComponent
   },

   {
    path:'assets/add',
    component: AddAssetComponent
   },

   {
     path: 'uinew',
     component:UinewComponent
   },

   {
    path:'usersupport',
    component:UsersupportComponent,

   },
   
   {
      path:'assets/delete',
      component:DeleteAssetComponent
   },

   {
    path:'assets/support',
    component:SupportComponent
   },

   {
    path:'assets/support/hardware',
    component:HardwareComponent
   },

    {
    path:'helppage',
    component:HelppageComponent
   },

   {
    path:'newsupport',
    component:SupportTableComponent
   },

   {
    path:'assets/hardware',
    component:  HardwareGridComponent 
   },
{
  path:'assets/hardware/grid',
  component:HardwareGridComponent

},
{
path:'assets/realalerts',
component:RealAlertsComponent
},
{
  path:'ewaste/disposable-assets',
  component:EDisposeComponent
},

{
  path:'ewaste/disposable-assets/add',
  component:AddEdisposeComponent
},

{
  path:'ewaste/disposable-assets/update',
  component:UpdateEdisposeComponent
},
{
    path:'ewaste/disposable-assets/guidelines',
  component:GuidelinesComponent
},

{
  path:'softwarelicense',
  component:SoftwareLicenseComponent
},

{
  path:'softwarelicense/add',
  component:AddSoftwareLicenseComponent
},

  { path: 'login/auth', component: LoginauthComponent },  
  { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'landing', loadComponent: () => import('../landing/landing.component').then(m => m.LandingComponent) },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  {path:'login/logout', component:LogoutComponent},
];

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
