import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelJobKindAddComponent } from './tbl-shamel-job-kind-add.component';

describe('TblShamelJobKindAddComponent', () => {
  let component: TblShamelJobKindAddComponent;
  let fixture: ComponentFixture<TblShamelJobKindAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelJobKindAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelJobKindAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
