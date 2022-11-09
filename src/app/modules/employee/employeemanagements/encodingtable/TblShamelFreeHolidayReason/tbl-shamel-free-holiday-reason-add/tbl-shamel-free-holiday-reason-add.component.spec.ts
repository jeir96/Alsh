import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelFreeHolidayReasonAddComponent } from './tbl-shamel-free-holiday-reason-add.component';

describe('TblShamelFreeHolidayReasonAddComponent', () => {
  let component: TblShamelFreeHolidayReasonAddComponent;
  let fixture: ComponentFixture<TblShamelFreeHolidayReasonAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelFreeHolidayReasonAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelFreeHolidayReasonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
