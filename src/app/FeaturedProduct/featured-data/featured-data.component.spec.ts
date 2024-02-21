import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedDataComponent } from './featured-data.component';

describe('FeaturedDataComponent', () => {
  let component: FeaturedDataComponent;
  let fixture: ComponentFixture<FeaturedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
