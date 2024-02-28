import { ToastService } from './../../toast.service';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
function sellingPriceLessThanMRPValidator(mrpControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const mrp = control.root.get(mrpControlName)?.value;
    const sellingPrice = control.value;
    return mrp !== null && sellingPrice !== null && sellingPrice > mrp
      ? { sellingPriceGreaterThanMRP: true }
      : null;
  };
}

function mrpGreaterThanPriceValidator(priceControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const price = control.root.get(priceControlName)?.value;
    const mrp = control.value;
    return price !== null && mrp !== null && mrp < price
      ? { mrpLessThanPrice: true }
      : null;
  };
}
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
    private route: ActivatedRoute,
    private location: Location) {

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
    // mrp: this.builder.control('', Validators.required),
    mrp: this.builder.control('', [
      Validators.required,
      mrpGreaterThanPriceValidator('purchasePrice')
    ]),
    sellingPrice: this.builder.control('', [
      Validators.required,
      sellingPriceLessThanMRPValidator('mrp')
    ]),
    itmVrntId: this.builder.control('', Validators.required),
    itemType: 1,
    purchaseDetail: "",
    prchsBillAttachment: "",
    purchaseDate: "2024-02-14",

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
      // this.router.navigate([`/viewProduct/${this.id}`]);
      this.location.back();
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError(error);
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }
}
