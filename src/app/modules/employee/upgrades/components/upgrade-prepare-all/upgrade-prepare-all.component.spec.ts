import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradePrepareAllComponent } from './upgrade-prepare-all.component';

describe('UpgradePrepareAllComponent', () => {
  let component: UpgradePrepareAllComponent;
  let fixture: ComponentFixture<UpgradePrepareAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradePrepareAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpgradePrepareAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
