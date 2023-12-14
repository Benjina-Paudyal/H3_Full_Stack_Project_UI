import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Genre } from 'src/app/models/genre.model';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent {
  genre: Genre[] = [];
  addGenreForm!: FormGroup;
  editGenreForm!: FormGroup;
  selectedGenreId: number | null = null;
  showAddForm: boolean = false;

  constructor(private fb: FormBuilder, private genreservice: GenreService) {}

  ngOnInit(): void {
    this.loadGenre();
    this.initForms();
  }

  loadGenre() {
    this.genreservice.getGenre().subscribe(
      (data: Genre[]) => {
        this.genre = data;
      },
      (error) => {
        console.error('Error fetching Actors', error);
      }
    );
  }

  initForms() {
    this.addGenreForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.editGenreForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  createGenre() {
    this.genreservice.addGenre(this.addGenreForm.value).subscribe((response) => {
      this.genre.push(response);
      this.addGenreForm.reset();
      this.showAddForm = false;
    });
  }

  updateGenre() {
    if (this.selectedGenreId) {
      const selectedGenre = this.genre.find((g) => g.genreid === this.selectedGenreId);
      if (selectedGenre) {
        const updatedGenre = { ...selectedGenre, ...this.editGenreForm.value };
        this.genreservice.updateGenre(updatedGenre).subscribe((response) => {
          Object.assign(selectedGenre, response);
          this.selectedGenreId = null;
          this.editGenreForm.reset();
        });
      }
    }
  }

  deleteGenre(genreid: number) {
    this.genreservice.deleteGenre(genreid).subscribe(() => {
      this.genre = this.genre.filter((g) => g.genreid !== genreid);
    });
  }

  selectGenreforEdit(genreid: number) {
    this.selectedGenreId = genreid;
    const selectedGenre = this.genre.find((g) => g.genreid === this.selectedGenreId);
    if (selectedGenre) {
      this.editGenreForm.setValue({
        name: selectedGenre.name,
      });
    }
  }

  cancelEdit() {
    this.selectedGenreId = null;
    this.editGenreForm.reset();
  }

  toggleAddFormVisibility() {
    this.showAddForm = !this.showAddForm;
  }



}
