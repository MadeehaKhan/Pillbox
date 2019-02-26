import { TestBed } from '@angular/core/testing';

import { MedicationService } from './medication.service';

describe('MedicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicationService = TestBed.get(MedicationService);
    expect(service).toBeTruthy();
  });
});
