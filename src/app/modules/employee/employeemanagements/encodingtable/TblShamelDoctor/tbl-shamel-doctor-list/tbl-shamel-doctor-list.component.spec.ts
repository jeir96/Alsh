import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelDoctorListComponent } from './tbl-shamel-doctor-list.component';

describe('TblShamelDoctorListComponent', () => {
  let component: TblShamelDoctorListComponent;
  let fixture: ComponentFixture<TblShamelDoctorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelDoctorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelDoctorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
