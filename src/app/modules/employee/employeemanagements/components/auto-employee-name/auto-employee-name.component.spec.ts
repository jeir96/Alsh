import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoEmployeeNameComponent } from './auto-employee-name.component';

describe('AutoEmployeeNameComponent', () => {
  let component: AutoEmployeeNameComponent;
  let fixture: ComponentFixture<AutoEmployeeNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoEmployeeNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoEmployeeNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
