import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationEnterPage } from './medication-enter.page';

describe('MedicationEnterPage', () => {
  let component: MedicationEnterPage;
  let fixture: ComponentFixture<MedicationEnterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicationEnterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationEnterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
