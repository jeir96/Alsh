import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelBonusAddComponent } from './tbl-shamel-bonus-add.component';

describe('TblShamelBonusAddComponent', () => {
  let component: TblShamelBonusAddComponent;
  let fixture: ComponentFixture<TblShamelBonusAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelBonusAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelBonusAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
