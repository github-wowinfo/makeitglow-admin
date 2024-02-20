import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogTagModalComponent } from './blog-tag-modal.component';

describe('BlogTagModalComponent', () => {
  let component: BlogTagModalComponent;
  let fixture: ComponentFixture<BlogTagModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogTagModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogTagModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
