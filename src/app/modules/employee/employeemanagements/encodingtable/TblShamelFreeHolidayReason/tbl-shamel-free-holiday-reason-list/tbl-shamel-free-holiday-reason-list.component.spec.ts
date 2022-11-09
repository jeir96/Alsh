import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelFreeHolidayReasonListComponent } from './tbl-shamel-free-holiday-reason-list.component';

describe('TblShamelFreeHolidayReasonListComponent', () => {
  let component: TblShamelFreeHolidayReasonListComponent;
  let fixture: ComponentFixture<TblShamelFreeHolidayReasonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelFreeHolidayReasonListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelFreeHolidayReasonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
