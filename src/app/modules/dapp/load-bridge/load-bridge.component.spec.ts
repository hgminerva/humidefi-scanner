import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadBridgeComponent } from './load-bridge.component';

describe('LoadBridgeComponent', () => {
  let component: LoadBridgeComponent;
  let fixture: ComponentFixture<LoadBridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadBridgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
