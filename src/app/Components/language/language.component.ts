import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Language } from 'src/app/models/language.model';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent {

  languages: Language[] = [];
  addLanguageForm!: FormGroup;
  editLanguageForm!: FormGroup;
  selectedLanguageId: number | null = null;
  showAddForm: boolean = false;
  
  constructor(private fb: FormBuilder, private languageService: LanguageService) {}
  ngOnInit(): void {
    this.loadLanguages();
    this.initForms();
  }

  loadLanguages() {
    this.languageService.getLanguage().subscribe(
      (data: Language[]) => {
        this.languages = data;
      },
      (error) => {
        console.error('Error fetching Languages', error);
      }
    );
  }
  initForms() {
    this.addLanguageForm = this.fb.group({
      name: ['', Validators.required],
      
    });

    this.editLanguageForm = this.fb.group({
      name: ['', Validators.required],
    
    });
  }

  createLanguage() {
    this.languageService.addLanguage(this.addLanguageForm.value).subscribe((response) => {
      this.languages.push(response);
      this.addLanguageForm.reset();
      this.showAddForm = false;
    });
  }

  updateLanguage() {
    if (this.selectedLanguageId) {
      const selectedLanguage = this.languages.find((lang) => lang.languageId === this.selectedLanguageId);
      if (selectedLanguage) {
        const updatedLanguage = { ...selectedLanguage, ...this.editLanguageForm.value };
        this.languageService.updateLanguage(updatedLanguage).subscribe((response) => {
          Object.assign(selectedLanguage, response);
          this.selectedLanguageId = null;
          this.editLanguageForm.reset();
        });
      }
    }
  }

  deleteLanguage(languageId: number) {
    this.languageService.deleteLanguage(languageId).subscribe(() => {
      this.languages = this.languages.filter((lang) => lang.languageId !== languageId);
    });
  }

  selectLanguageforEdit(languageId: number) {
    this.selectedLanguageId = languageId;
    const selectedLanguage = this.languages.find((lang) => lang.languageId === this.selectedLanguageId);
    if (selectedLanguage) {
      this.editLanguageForm.setValue({
        name: selectedLanguage.name,
       
      });
    }
  }

  cancelEdit() {
    this.selectedLanguageId = null;
    this.editLanguageForm.reset();
  }
  toggleAddFormVisibility() {
    this.showAddForm = !this.showAddForm;
  }

}
