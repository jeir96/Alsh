import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelDepartmentAddComponent } from './tbl-shamel-department-add.component';

describe('TblShamelDepartmentAddComponent', () => {
  let component: TblShamelDepartmentAddComponent;
  let fixture: ComponentFixture<TblShamelDepartmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelDepartmentAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelDepartmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
