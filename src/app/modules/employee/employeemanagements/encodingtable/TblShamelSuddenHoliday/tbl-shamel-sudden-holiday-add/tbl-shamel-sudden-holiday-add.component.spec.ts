import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelSuddenHolidayAddComponent } from './tbl-shamel-sudden-holiday-add.component';

describe('TblShamelSuddenHolidayAddComponent', () => {
  let component: TblShamelSuddenHolidayAddComponent;
  let fixture: ComponentFixture<TblShamelSuddenHolidayAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelSuddenHolidayAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelSuddenHolidayAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
