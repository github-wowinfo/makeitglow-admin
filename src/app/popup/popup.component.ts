import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PopupComponent>) { }

  inputData: any;

  ngOnInit(): void {
    this.inputData = this.data
  }
  closepopup() {
    this.ref.close('Close using function')
  }
}
