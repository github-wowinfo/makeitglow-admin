import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularModalComponent } from './popular-modal.component';

describe('PopularModalComponent', () => {
  let component: PopularModalComponent;
  let fixture: ComponentFixture<PopularModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
