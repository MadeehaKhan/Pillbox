import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDBPage } from './test-db.page';

describe('TestDBPage', () => {
  let component: TestDBPage;
  let fixture: ComponentFixture<TestDBPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDBPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDBPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
