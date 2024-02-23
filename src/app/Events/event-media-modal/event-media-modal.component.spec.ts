import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMediaModalComponent } from './event-media-modal.component';

describe('EventMediaModalComponent', () => {
  let component: EventMediaModalComponent;
  let fixture: ComponentFixture<EventMediaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventMediaModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventMediaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
