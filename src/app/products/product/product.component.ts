import { PopupComponent } from '../../popup/popup.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  Openpopup() {

    var _popup = this.dialog.open(PopupComponent, {
      width: '60%',
      data: {
        title: 'Add Product'
      }
    });

    _popup.afterClosed().subscribe(item => {
      console.log(item);

    })
  }
}
