import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelDepartmentListComponent } from './tbl-shamel-department-list.component';

describe('TblShamelDepartmentListComponent', () => {
  let component: TblShamelDepartmentListComponent;
  let fixture: ComponentFixture<TblShamelDepartmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelDepartmentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelDepartmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
