import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteEmployeeNameComponent } from './auto-complete-employee-name.component';

describe('AutoCompleteEmployeeNameComponent', () => {
  let component: AutoCompleteEmployeeNameComponent;
  let fixture: ComponentFixture<AutoCompleteEmployeeNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoCompleteEmployeeNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoCompleteEmployeeNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
