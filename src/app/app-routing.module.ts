import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { DirectorsComponent } from './Components/directors/directors.component';
import { AwardsComponent } from './Components/awards/awards.component';
import { GenreComponent } from './Components/genre/genre.component';
import { LanguageComponent } from './Components/language/language.component';
import { ReviewComponent } from './Components/review/review.component';
import { MovieZoneComponent } from './Components/movie-zone/movie-zone.component';
import { ActorsComponent } from './Components/actors/actors.component';


// defining routes

const routes: Routes = [
  { path:'',redirectTo:'/home', pathMatch:'full'}, // default route
  { path:'home',component:HomeComponent },
  { path:'categories',component:CategoriesComponent },
  { path:'login',component:LoginComponent },
  { path:'register',component:RegisterComponent },
  { path:'directors' ,component : DirectorsComponent },
  { path:'awards',component:AwardsComponent },
  { path:'genre',component:GenreComponent},
  { path:'languages',component:LanguageComponent },
  { path:'Review',component:ReviewComponent },
  { path:'MovieZone',component:MovieZoneComponent },
  { path:'actors',component:ActorsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
