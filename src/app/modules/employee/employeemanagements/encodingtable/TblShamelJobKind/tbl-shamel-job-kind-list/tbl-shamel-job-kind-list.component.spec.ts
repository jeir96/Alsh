import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelJobKindListComponent } from './tbl-shamel-job-kind-list.component';

describe('TblShamelJobKindListComponent', () => {
  let component: TblShamelJobKindListComponent;
  let fixture: ComponentFixture<TblShamelJobKindListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelJobKindListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelJobKindListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
