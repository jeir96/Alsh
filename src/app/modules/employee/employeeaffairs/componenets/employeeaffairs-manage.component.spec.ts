import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeaffairsManageComponent } from './employeeaffairs-manage.component';

describe('EmployeeaffairsManageComponent', () => {
  let component: EmployeeaffairsManageComponent;
  let fixture: ComponentFixture<EmployeeaffairsManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeaffairsManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeaffairsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
