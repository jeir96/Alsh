import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelJobNameListComponent } from './tbl-shamel-job-name-list.component';

describe('TblShamelJobNameListComponent', () => {
  let component: TblShamelJobNameListComponent;
  let fixture: ComponentFixture<TblShamelJobNameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelJobNameListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelJobNameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
