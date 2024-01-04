import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor() { }
  onFileSelected(event) {
    console.log(event.target.files)
  }
  ngOnInit(): void {
  }

}
