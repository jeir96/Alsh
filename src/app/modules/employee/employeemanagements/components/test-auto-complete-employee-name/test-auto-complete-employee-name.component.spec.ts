import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAutoCompleteEmployeeNameComponent } from './test-auto-complete-employee-name.component';

describe('TestAutoCompleteEmployeeNameComponent', () => {
  let component: TestAutoCompleteEmployeeNameComponent;
  let fixture: ComponentFixture<TestAutoCompleteEmployeeNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAutoCompleteEmployeeNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestAutoCompleteEmployeeNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
