import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefernceModalComponent } from './refernce-modal.component';

describe('RefernceModalComponent', () => {
  let component: RefernceModalComponent;
  let fixture: ComponentFixture<RefernceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefernceModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefernceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
