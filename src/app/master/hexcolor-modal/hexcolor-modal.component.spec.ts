import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HexcolorModalComponent } from './hexcolor-modal.component';

describe('HexcolorModalComponent', () => {
  let component: HexcolorModalComponent;
  let fixture: ComponentFixture<HexcolorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HexcolorModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HexcolorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
