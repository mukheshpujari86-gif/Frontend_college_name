import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },  // default
  {path: 'login', component: LoginComponent },  // view
  {path: 'Register', component: RegisterComponent },  // default
  {path:'home',component:HomeComponent},  // view
  { path: 'about', component: AboutComponent },        // create
{ path: 'about/:id', component: AboutComponent }     // update
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
