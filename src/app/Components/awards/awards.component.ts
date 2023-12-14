import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Award } from 'src/app/models/award.model';
import { AwardService } from 'src/app/services/award.service';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css']
})
export class AwardsComponent implements OnInit{
  awards:Award[]=[];
  addawardForm!:FormGroup;
  editAwardForm!:FormGroup;
  selectedAwardId:number|null=null;
  ShowAddForm:boolean=false;

  constructor(private fb:FormBuilder,private awardservice:AwardService){}

  ngOnInit(): void {
    this.loadAwards();
    this.initForms();

    }

    loadAwards() {
      this.awardservice.getAwards().subscribe(
        (data: Award[]) => {
          console.log('Awards data', data);
          this.awards = data;
        },
        (error) => {
          console.error('Error fetching Awards', error);
        }
      );
    }
    
    initForms() {
      this.addawardForm = this.fb.group({
        name: ['', Validators.required],
        MovieId: ['', Validators.required]
      });
    
      this.editAwardForm = this.fb.group({
        name: ['', Validators.required],
        MovieId: ['', Validators.required]
      });
    }
    
    createAward() {
      this.awardservice.addAward(this.addawardForm.value).subscribe((response) => {
        this.awards.push(response);
        this.addawardForm.reset();
        this.ShowAddForm = false;
      });
    }
    
    updateAward() {
      if (this.selectedAwardId) {
        const selectedAward = this.awards.find((award) => award.awardId === this.selectedAwardId);
        if (selectedAward) {
          const updatedAward = { ...selectedAward, ...this.editAwardForm.value };
          this.awardservice.updateAward(updatedAward).subscribe((response) => {
            Object.assign(selectedAward, response);
            this.selectedAwardId = null;
            this.editAwardForm.reset();
          });
        }
      }
    }
    
    deleteAward(id: number) {
      this.awardservice.deleteAward(id).subscribe(() => {
        this.awards = this.awards.filter((award) => award.awardId !== id);
      });
    }
    
    selectedAwardforEdit(id: number) {
      this.selectedAwardId = id;
      const selectedAward = this.awards.find((award) => award.awardId === this.selectedAwardId);
      if (selectedAward) {
        this.editAwardForm.setValue({ name: selectedAward.name, MovieId: selectedAward.MovieId });
      }
    }
    
    cancelEdit() {
      this.selectedAwardId = null;
      this.editAwardForm.reset();
    }
    
    toggleAddFormVisibility() {
      this.ShowAddForm = !this.ShowAddForm;
    }
    
    }


