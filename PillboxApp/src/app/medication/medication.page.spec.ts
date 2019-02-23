import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationPage } from './medication.page';

describe('MedicationPage', () => {
  let component: MedicationPage;
  let fixture: ComponentFixture<MedicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
