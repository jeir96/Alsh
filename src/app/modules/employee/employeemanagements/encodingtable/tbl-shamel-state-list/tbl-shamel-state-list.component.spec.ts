import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelStateListComponent } from './tbl-shamel-state-list.component';

describe('TblShamelStateListComponent', () => {
  let component: TblShamelStateListComponent;
  let fixture: ComponentFixture<TblShamelStateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelStateListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelStateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
