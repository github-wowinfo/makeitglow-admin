import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCatModalComponent } from './blog-cat-modal.component';

describe('BlogCatModalComponent', () => {
  let component: BlogCatModalComponent;
  let fixture: ComponentFixture<BlogCatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogCatModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogCatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
