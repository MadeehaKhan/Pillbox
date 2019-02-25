import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationModifyPage } from './medication-modify.page';

describe('MedicationModifyPage', () => {
  let component: MedicationModifyPage;
  let fixture: ComponentFixture<MedicationModifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicationModifyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationModifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
