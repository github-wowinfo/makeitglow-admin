import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product-variant',
  templateUrl: './add-product-variant.component.html',
  styleUrls: ['./add-product-variant.component.scss']
})
export class AddProductVariantComponent implements OnInit {
  onFileSelected(event) {
    console.log(event.target.files)
  }
  constructor() { }

  ngOnInit(): void {
  }

}
