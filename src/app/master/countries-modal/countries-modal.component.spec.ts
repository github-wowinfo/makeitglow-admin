import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesModalComponent } from './countries-modal.component';

describe('CountriesModalComponent', () => {
  let component: CountriesModalComponent;
  let fixture: ComponentFixture<CountriesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
