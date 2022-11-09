import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblShamelBrokerShatebModifyComponent } from './tbl-shamel-broker-shateb-modify.component';

describe('TblShamelBrokerShatebModifyComponent', () => {
  let component: TblShamelBrokerShatebModifyComponent;
  let fixture: ComponentFixture<TblShamelBrokerShatebModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblShamelBrokerShatebModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblShamelBrokerShatebModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
