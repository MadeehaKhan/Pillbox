import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllMedicationsPage } from './view-all-medications.page';

describe('ViewAllMedicationsPage', () => {
  let component: ViewAllMedicationsPage;
  let fixture: ComponentFixture<ViewAllMedicationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllMedicationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllMedicationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
