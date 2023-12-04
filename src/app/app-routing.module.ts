import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { MoviesComponent } from './Components/movies/movies.component';
import {CategoriesComponent } from './Components/categories/categories.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';

// defining routes
const routes: Routes = [
  { path:'',redirectTo:'/home', pathMatch:'full'}, // default route
  { path:'home',component:HomeComponent},
  { path:'categories',component:CategoriesComponent},
  { path:'movies',component:MoviesComponent},
  { path:'login',component:LoginComponent},
  { path:'register',component:RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
