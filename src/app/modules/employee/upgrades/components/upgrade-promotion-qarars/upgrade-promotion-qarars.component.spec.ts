import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradePromotionQararsComponent } from './upgrade-promotion-qarars.component';

describe('UpgradePromotionQararsComponent', () => {
  let component: UpgradePromotionQararsComponent;
  let fixture: ComponentFixture<UpgradePromotionQararsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradePromotionQararsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpgradePromotionQararsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
