import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelBonusListComponent } from './tbl-shamel-bonus-list.component';

describe('TblShamelBonusListComponent', () => {
  let component: TblShamelBonusListComponent;
  let fixture: ComponentFixture<TblShamelBonusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelBonusListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelBonusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
