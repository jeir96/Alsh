import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTBLShamelUpgradeComponent } from './list-tblshamel-upgrade.component';

describe('ListTBLShamelUpgradeComponent', () => {
  let component: ListTBLShamelUpgradeComponent;
  let fixture: ComponentFixture<ListTBLShamelUpgradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTBLShamelUpgradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTBLShamelUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
