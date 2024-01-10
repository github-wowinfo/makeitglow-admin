import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxModalComponent } from './tax-modal.component';

describe('TaxModalComponent', () => {
  let component: TaxModalComponent;
  let fixture: ComponentFixture<TaxModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
