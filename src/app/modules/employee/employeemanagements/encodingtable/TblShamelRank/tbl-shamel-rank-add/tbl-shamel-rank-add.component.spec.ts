import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelRankAddComponent } from './tbl-shamel-rank-add.component';

describe('TblShamelRankAddComponent', () => {
  let component: TblShamelRankAddComponent;
  let fixture: ComponentFixture<TblShamelRankAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelRankAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelRankAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
