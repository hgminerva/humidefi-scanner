import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilebarComponent } from './mobilebar.component';

describe('MobilebarComponent', () => {
  let component: MobilebarComponent;
  let fixture: ComponentFixture<MobilebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobilebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
