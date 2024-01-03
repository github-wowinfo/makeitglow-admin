import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-modal',
  templateUrl: './brand-modal.component.html',
  styleUrls: ['./brand-modal.component.scss']
})
export class BrandModalComponent implements OnInit {

  constructor(private ref: MatDialogRef<BrandModalComponent>) { }

  ngOnInit(): void {
  }

  closepopup() {
    this.ref.close()
  }

}
