import { ToastService } from './../../toast.service';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {

  id: string;
  inputdata: any;
  errorMessage: string = '';
  constructor(private apiService: ApiService,
    private builder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Retrieve the 'id' parameter from the URL
      this.id = params.get('id');
      console.log(this.id);
      this.myForm.get('itmVrntId')?.setValue(this.id);
    })
  }


  myForm = this.builder.group({
    //     <!-- "purchasePrice": 55,
    // "purchaseQty": 100,
    // "itmVrntId": 45,
    // "mrp": 70,
    // "sellingPrice": 55,
    // "shippingCharges": 0,
    // "availableQty": 100 -->
    purchasePrice: this.builder.control('', Validators.required),
    purchaseQty: this.builder.control('', Validators.required),
    availableQty: this.builder.control('', Validators.required),
    mrp: this.builder.control('', Validators.required),
    sellingPrice: this.builder.control('', Validators.required),
    itmVrntId: this.builder.control('', Validators.required),
  });
  onFormSubmit() {
    if (this.myForm.valid) {
      this.addVariant();
    } else {
      this.toastService.showError('Please fill out the Required Fields.');
    }
  }

  addVariant() {
    // const formData = new FormData();
    // // Append each field of myForm to FormData
    // Object.keys(this.myForm.value).forEach(key => {
    //   formData.append(key, this.myForm.value[key]);
    // });
    console.log('formData', this.myForm.value);

    this.apiService.addVariantStock(this.myForm.value).subscribe(res => {
      this.toastService.showSuccess('Product Stock Added successfully!');
      // location.reload()
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError(error);
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }
}
