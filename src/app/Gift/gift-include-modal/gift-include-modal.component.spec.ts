import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftIncludeModalComponent } from './gift-include-modal.component';

describe('GiftIncludeModalComponent', () => {
  let component: GiftIncludeModalComponent;
  let fixture: ComponentFixture<GiftIncludeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftIncludeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftIncludeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
