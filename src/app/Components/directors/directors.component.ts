import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Director } from 'src/app/models/director.model';
import { DirectorService } from 'src/app/services/director.service'; 



@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.css']
})
export class DirectorsComponent {
  directors: Director[] = [];
  addDirectorForm!: FormGroup;
  editDirectorForm!: FormGroup;
  selectedDirectorId: number | null = null;
  showAddForm: boolean = false;

  constructor(private fb: FormBuilder, private directorservice: DirectorService) {}

  ngOnInit(): void {
    this.loadDirectors();
    this.initForms();
  }

  loadDirectors() {
    this.directorservice.getDirectors().subscribe(
      (data: Director[]) => {
        this.directors = data;
      },
      (error) => {
        console.error('Error fetching Actors', error);
      }
    );
  }

  initForms() {
    this.addDirectorForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.editDirectorForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  createDirector() {
    this.directorservice.addDirector(this.addDirectorForm.value).subscribe((response) => {
      this.directors.push(response);
      this.addDirectorForm.reset();
      this.showAddForm = false;
    });
  }

  updateDirector() {
    if (this.selectedDirectorId) {
      const selectedActor = this.directors.find((director) => director.directorId === this.selectedDirectorId);
      if (selectedActor) {
        const updatedActor = { ...selectedActor, ...this.editDirectorForm.value };
        this.directorservice.updateDirector(updatedActor).subscribe((response) => {
          Object.assign(selectedActor, response);
          this.selectedDirectorId = null;
          this.editDirectorForm.reset();
        });
      }
    }
  }

  deleteDirector(directorId: number) {
    this.directorservice.deleteDirector(directorId).subscribe(() => {
      this.directors = this.directors.filter((actor) => actor.directorId !== directorId);
    });
  }

  selectDirectorforEdit(directorId: number) {
    this.selectedDirectorId = directorId;
    const selecteddirector = this.directors.find((director) => director.directorId=== this.selectedDirectorId);
    if (selecteddirector ) {
      this.editDirectorForm.setValue({
        name: selecteddirector.name,
      });
    }
  }

  cancelEdit() {
    this.selectedDirectorId = null;
    this.editDirectorForm.reset();
  }

  toggleAddFormVisibility() {
    this.showAddForm = !this.showAddForm;
  }



}


