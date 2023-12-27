import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PopupComponent>, private builder: FormBuilder) { }

  inputData: any;

  ngOnInit(): void {
    this.inputData = this.data
  }
  closepopup() {
    this.ref.close('Close using function')
  }

  myform = this.builder.group({
    name: this.builder.control(''),
    email: this.builder.control(''),
    phone: this.builder.control(''),
    status: this.builder.control(false),
  })

  Saveuser() {
    console.log(this.myform.value);

  }
}
