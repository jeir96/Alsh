import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TBLShamelCardPagesAddComponent } from './tblshamel-card-pages-add.component';

describe('TBLShamelCardPagesAddComponent', () => {
  let component: TBLShamelCardPagesAddComponent;
  let fixture: ComponentFixture<TBLShamelCardPagesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TBLShamelCardPagesAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TBLShamelCardPagesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
