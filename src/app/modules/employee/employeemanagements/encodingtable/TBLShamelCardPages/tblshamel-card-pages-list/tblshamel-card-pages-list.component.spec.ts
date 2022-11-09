import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TBLShamelCardPagesListComponent } from './tblshamel-card-pages-list.component';

describe('TBLShamelCardPagesListComponent', () => {
  let component: TBLShamelCardPagesListComponent;
  let fixture: ComponentFixture<TBLShamelCardPagesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TBLShamelCardPagesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TBLShamelCardPagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
