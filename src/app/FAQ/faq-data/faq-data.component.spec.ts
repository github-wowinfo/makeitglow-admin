import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqDataComponent } from './faq-data.component';

describe('FaqDataComponent', () => {
  let component: FaqDataComponent;
  let fixture: ComponentFixture<FaqDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
