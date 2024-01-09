import { SliderModalComponent } from './../slider-modal/slider-modal.component';
import { SubcategoryModalComponent } from './../subcategory-modal/subcategory-modal.component';
import { CategoryModalComponent } from './../category-modal/category-modal.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrandModalComponent } from '../brand-modal/brand-modal.component';
import { HexcolorModalComponent } from '../hexcolor-modal/hexcolor-modal.component';
import { RefernceModalComponent } from '../refernce-modal/refernce-modal.component';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss']
})
export class MasterDataComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }




  OpenReference() {
    var _popup = this.dialog.open(RefernceModalComponent, {
      width: '40%',
    });
  }
  OpenHexColor() {
    var _popup = this.dialog.open(HexcolorModalComponent, {
      width: '40%',
    });
  }
  OpenCategory() {
    var _popup = this.dialog.open(CategoryModalComponent, {
      width: '40%',
    });
  }
  OpenSubCategory() {
    var _popup = this.dialog.open(SubcategoryModalComponent, {
      width: '40%',
    });
  }
  OpenSliders() {
    var _popup = this.dialog.open(SliderModalComponent, {
      width: '40%',
    });
  }
}
