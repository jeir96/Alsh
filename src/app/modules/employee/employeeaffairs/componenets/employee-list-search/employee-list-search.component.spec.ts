import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListSearchComponent } from './employee-list-search.component';

describe('EmployeeListSearchComponent', () => {
  let component: EmployeeListSearchComponent;
  let fixture: ComponentFixture<EmployeeListSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeListSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
