import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-zone',
  templateUrl: './movie-zone.component.html',
  styleUrls: ['./movie-zone.component.css']
})
export class MovieZoneComponent {
  movies: Movie[] = [];
  addMovieForm!: FormGroup;
  editMovieForm!: FormGroup;
  selectedMovieId: number | null = null;
  showAddForm: boolean = false;

  constructor(private fb: FormBuilder, private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
    this.initForms();
  }

  loadMovies() {
    this.movieService.getMovies().subscribe(
      (data: Movie[]) => {
        this.movies = data;
      },
      (error) => {
        console.error('Error fetching Movies', error);
      }
    );
  }

  initForms() {
    this.addMovieForm = this.fb.group({
      title: ['', Validators.required],
      directorId:['',Validators.required]
      
    });

    this.editMovieForm = this.fb.group({
      title: ['', Validators.required],
      
    });
  }

  createMovie() {
    this.movieService.addMovies(this.addMovieForm.value).subscribe((response) => {
      this.movies.push(response);
      this.addMovieForm.reset();
      this.showAddForm = false;
    });
  }


  updateMovie() {
    if (this.selectedMovieId) {
      const selectedMovie = this.movies.find((m) => m.movieId === this.selectedMovieId);
      if (selectedMovie) {
        const updatedMovie = { ...selectedMovie, ...this.editMovieForm.value };
        this.movieService.updateMovie(updatedMovie).subscribe((response) => {
          Object.assign(selectedMovie, response);
          this.selectedMovieId = null;
          this.editMovieForm.reset();
        });
      }
    }
  }


  deleteMovie(id: number) {
    this.movieService.deleteMovie(id).subscribe(() => {
      this.movies = this.movies.filter((m) => m.movieId !== id);
    });
  }


  selectMovieforEdit(id: number) {
    this.selectedMovieId = id;
    const selectedMovie = this.movies.find((m) => m.movieId === this.selectedMovieId);
    if (selectedMovie) {
      this.editMovieForm.setValue({
        title: selectedMovie.title,
        
      });
    }
  }

  cancelEdit() {
    this.selectedMovieId = null;
    this.editMovieForm.reset();
  }

  
  toggleAddFormVisibility() {
    this.showAddForm = !this.showAddForm;
  }

}



