import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedschedPage } from './medsched.page';

describe('MedschedPage', () => {
  let component: MedschedPage;
  let fixture: ComponentFixture<MedschedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedschedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedschedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
