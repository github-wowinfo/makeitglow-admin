import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularDataComponent } from './popular-data.component';

describe('PopularDataComponent', () => {
  let component: PopularDataComponent;
  let fixture: ComponentFixture<PopularDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
