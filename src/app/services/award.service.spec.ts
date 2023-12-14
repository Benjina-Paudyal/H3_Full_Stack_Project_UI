import { TestBed } from '@angular/core/testing';

import { AwardService } from './award.service';

describe('AwardServiceService', () => {
  let service: AwardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
