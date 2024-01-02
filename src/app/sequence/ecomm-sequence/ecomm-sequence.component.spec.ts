import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommSequenceComponent } from './ecomm-sequence.component';

describe('EcommSequenceComponent', () => {
  let component: EcommSequenceComponent;
  let fixture: ComponentFixture<EcommSequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcommSequenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
