import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCategoryModalComponent } from './top-category-modal.component';

describe('TopCategoryModalComponent', () => {
  let component: TopCategoryModalComponent;
  let fixture: ComponentFixture<TopCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopCategoryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
