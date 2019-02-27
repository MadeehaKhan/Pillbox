import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePhonePage } from './change-phone.page';

describe('ChangePhonePage', () => {
  let component: ChangePhonePage;
  let fixture: ComponentFixture<ChangePhonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePhonePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePhonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
