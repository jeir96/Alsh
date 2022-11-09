import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelDoctorAddComponent } from './tbl-shamel-doctor-add.component';

describe('TblShamelDoctorAddComponent', () => {
  let component: TblShamelDoctorAddComponent;
  let fixture: ComponentFixture<TblShamelDoctorAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelDoctorAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelDoctorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
