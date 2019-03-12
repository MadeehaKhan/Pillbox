import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeHealthconditionsPage } from './change-healthconditions.page';

describe('ChangeHealthconditionsPage', () => {
  let component: ChangeHealthconditionsPage;
  let fixture: ComponentFixture<ChangeHealthconditionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeHealthconditionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeHealthconditionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
