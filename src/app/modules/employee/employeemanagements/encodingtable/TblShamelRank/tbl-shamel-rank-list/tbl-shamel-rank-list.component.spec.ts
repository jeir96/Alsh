import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelRankListComponent } from './tbl-shamel-rank-list.component';

describe('TblShamelRankListComponent', () => {
  let component: TblShamelRankListComponent;
  let fixture: ComponentFixture<TblShamelRankListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelRankListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelRankListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
