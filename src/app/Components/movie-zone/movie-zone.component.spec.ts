import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieZoneComponent } from './movie-zone.component';

describe('MovieZoneComponent', () => {
  let component: MovieZoneComponent;
  let fixture: ComponentFixture<MovieZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieZoneComponent]
    });
    fixture = TestBed.createComponent(MovieZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
