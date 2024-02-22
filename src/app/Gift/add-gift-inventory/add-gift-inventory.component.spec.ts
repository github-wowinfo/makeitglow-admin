import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGiftInventoryComponent } from './add-gift-inventory.component';

describe('AddGiftInventoryComponent', () => {
  let component: AddGiftInventoryComponent;
  let fixture: ComponentFixture<AddGiftInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGiftInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGiftInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
