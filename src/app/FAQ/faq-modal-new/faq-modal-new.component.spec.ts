import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqModalNewComponent } from './faq-modal-new.component';

describe('FaqModalNewComponent', () => {
  let component: FaqModalNewComponent;
  let fixture: ComponentFixture<FaqModalNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqModalNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqModalNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
