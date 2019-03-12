import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePhysicianinformationPage } from './change-physicianinformation.page';

describe('ChangePhysicianinformationPage', () => {
  let component: ChangePhysicianinformationPage;
  let fixture: ComponentFixture<ChangePhysicianinformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePhysicianinformationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePhysicianinformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
