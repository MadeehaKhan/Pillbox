import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCRUDPage } from './test-crud.page';

describe('TestCRUDPage', () => {
  let component: TestCRUDPage;
  let fixture: ComponentFixture<TestCRUDPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCRUDPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCRUDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
