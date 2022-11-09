import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelSuddenHolidayListComponent } from './tbl-shamel-sudden-holiday-list.component';

describe('TblShamelSuddenHolidayListComponent', () => {
  let component: TblShamelSuddenHolidayListComponent;
  let fixture: ComponentFixture<TblShamelSuddenHolidayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelSuddenHolidayListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelSuddenHolidayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
