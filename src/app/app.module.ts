
// Here, the AppModule is using the BrowserModule , declaring all other components like navbar, home etc and setting
// AppComponent as the bootstrap component.


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MoviesComponent } from './Components/movies/movies.component';
import { RegisterComponent } from './Components/register/register.component';

// decorator used to define and configure modules. it takes a metadata object that provides information about the module and its various features. metadata object: provides configuration details that help Angular understand how to process and use the associated class(module, component, directive, pipe). For @Ng Module decorator, the metadata object specifies the properties like 'declaritions', 'imports','providers' and more.

@NgModule({

  // array of components that belong to the module. Componets here are private and can be used in the module's templates
  declarations: [   
    AppComponent,
    NavbarComponent,
    CategoriesComponent,
    HomeComponent,
    LoginComponent,
    MoviesComponent,
    RegisterComponent
  ],

  // array of other modules,this module depends on which allows us to use the features from other modules
  imports: [            
    BrowserModule,
    AppRoutingModule
  ],

  // array of services that the module makes available to the rest of the application which can be injected(in other 
  // services or modules)
  providers: [], 

  //  array of components that are automatically created when the application starts. These are typically the root 
  //  component(main component) of the application 
  bootstrap: [AppComponent]  
})
export class AppModule { }
