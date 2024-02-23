import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventModalNewComponent } from './event-modal-new.component';

describe('EventModalNewComponent', () => {
  let component: EventModalNewComponent;
  let fixture: ComponentFixture<EventModalNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventModalNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventModalNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
