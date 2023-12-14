
/*
The code below represents an angular component responsible for dispaying a list of actors. The data is fetched from an API using an angular service. The component has a lifecycle hook (ngOnInit) where it initiates the loading of actors. The fetched data isstored in the actors property for use in the components template.Error handling is implemented to log any errors that may occur during the API request.
*/

import { HttpErrorResponse } from '@angular/common/http';// define components and implement OnInit lifecycle hook
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actor} from 'src/app/models/actor.model'; 
import { ActorService } from 'src/app/services/actor.service'; 


/* decorator used to define component which takes metadata object with properties like selector, templateUrl & styleUrls */
@Component({
  selector: 'app-actors', // html element where this component will be rendered
  templateUrl: './actors.component.html', // html template file for the component
  styleUrls: ['./actors.component.css'] // array of CSS files
})
export class ActorsComponent implements OnInit{

  actors: Actor[] = []; // property to store an array of actor objects
  addActorForm!: FormGroup; // property addActorForm of type FormGroup, ! : this property will be initialized later
  editActorForm!: FormGroup; // either in the constructor or elsewhere in the code
  selectedActorId: number | null = null; //used to keep track of the currently selected actor's ID
  showAddForm: boolean = false; // for the visibility of the form for adding new actors


// DI of FormBuilder, which is used for creating form groups and controls and DI of  ActorService
  constructor(private fb: FormBuilder , private actorservice: ActorService) { } 

  /* ngOninit: lifecycle hook method: is called when the component is initialized and is about to render. here, it calls loadActors() */
  ngOnInit(): void {      // ngOnInit method is commonly used for initialization tasks.
    this.loadActors(); 
    this.initForms();   // this:current instance of the component
  }

  /*  loadActors(): method to fetch actors from the 'ActorService' . the data is fetched asynchronously 
      using the subscribe method which is commonly used with HttpClient for making HTTP requests 

    this.actorservice.getActors():This is a method call to 'getActors' which returns an observable.
    .subscribe() : this method is called on the observable returned by this.actorservice.getActors(). The subscribe method takes one or more callback functions as arguments  one for handling successfull responses "data" and another for handling errors "error". The subscribe method is a key part of working with asynchronous operations in Angular.

    data: Actor[]) => {...}: this is success callback function (arrow function) that handles the successful response from the observable. It receives the data (an array of actors) returned by the API.

   console.log('API Response:', data) : logs the API response to the cosnole for debugging

   this.actors = data: updates the actors property of the component with the received data
  */
  loadActors(){                   
    this.actorservice.getActors().subscribe(  
      (data: Actor[]) => {
        this.actors = data
      },
      (error) => {
       console.error('Error fetching Actors',error);
      }
    );
  }

  /*
    this.addActorForm = this.fb.group({ ... }): initializes 'addActorForm' property with a form group created using the 'FormBuilder' service(this.fb)
    FormBuilder.group(): method is used to create a form group which is a collection of form controls.
    name: ['', Validators.required]: defines a form control named name inside the form group. The inital value of the name control is empty string and the Validators.required is applied to the name control indicating
    that the control is required and must have non-empty value.
    All in all the addActorForm is a FormGroup contianing a single form control name and this control is required and will be considered invalid if the name field is empty.
  
  */
  initForms() {
    this.addActorForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.editActorForm = this.fb.group({
      name: ['', Validators.required],
    });
  }


  createActor() {
    this.actorservice.addActor(this.addActorForm.value).subscribe((response) => {
      this.actors.push(response);
      this.addActorForm.reset();
      this.showAddForm = false;
    });
  }

  updateActor() {
    if (this.selectedActorId) {
      const selectedActor = this.actors.find((actor) => actor.actorId === this.selectedActorId);
      if (selectedActor) {
        /* creates a new object updatedActor whose job is to update the selected actor with the values from the form by merging the properties of selectedActor and this.editActorForm */
        const updatedActor = { ...selectedActor, ...this.editActorForm.value };
        /* calls the updateActor method and suscribes to the observable returned by updateActor to handle the
        asynchronous response */
        this.actorservice.updateActor(updatedActor).subscribe((response) => {
          //Copies the properties from the response (updated actor from the server) to the selectedActor in the local array.
          Object.assign(selectedActor, response);
          this.selectedActorId = null;// reset to null after the update
          this.editActorForm.reset(); // reset the form after a successful update
        });
      }
    }
  }

  deleteActor(actorId: number) {
    this.actorservice.deleteActor(actorId).subscribe(() => {

      /* Once the deletion on the server is successful, it updates the local actors array by filtering out the deleted actor.The filter method is used to create a new array that includes only the actors whose actorId is not equal to the deleted actorId. */
      this.actors = this.actors.filter((actor) => actor.actorId !== actorId);
    });
  }


  selectActorforEdit(actorId: number) {
    this.selectedActorId = actorId;
    /* Finds the actor in the this.actors array whose actorId matches the selectedActorId. This is used to retrieve the details of the selected actor. */
    const selectedActor = this.actors.find((actor) => actor.actorId === this.selectedActorId);
    if (selectedActor) {

      /*Sets the value of the editActorForm using the setValue method.
      In this case, it sets the name field in the form to the name property of the selected actor.*/
      this.editActorForm.setValue({
        name: selectedActor.name,
      });
    }
  }

  cancelEdit() {
    this.selectedActorId = null;
    this.editActorForm.reset();
  }

  toggleAddFormVisibility() {
    this.showAddForm = !this.showAddForm;
  }

}






