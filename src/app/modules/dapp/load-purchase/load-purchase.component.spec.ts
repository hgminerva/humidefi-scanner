import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPurchaseComponent } from './load-purchase.component';

describe('LoadPurchaseComponent', () => {
  let component: LoadPurchaseComponent;
  let fixture: ComponentFixture<LoadPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadPurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
