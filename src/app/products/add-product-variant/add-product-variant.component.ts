import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from './../../toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product-variant',
  templateUrl: './add-product-variant.component.html',
  styleUrls: ['./add-product-variant.component.scss']
})
export class AddProductVariantComponent implements OnInit {
  // onFileSelected(event) {
  //   console.log(event.target.files)
  // }
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
      this.myForm.get('ItemId')?.setValue(this.id);
    })
  }


  myForm = this.builder.group({
    ItemId: this.builder.control('', Validators.required),
    Srno: this.builder.control('', Validators.required),
    BarCodeNo: this.builder.control('', Validators.required),
    ItemTitle: this.builder.control('', Validators.required),
    HowToUse: this.builder.control('', Validators.required),
    UnitVolume: this.builder.control('', Validators.required),
    ThumbnailFile: ['', Validators.required],
    MainImage1File: ['', Validators.required],
    Image2File: ['', Validators.required],
    Image3File: ['', Validators.required],
  });



  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.get('ThumbnailFile')?.setValue(file); // Set to file object
    }
  }

  onMain1FileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.get('MainImage1File')?.setValue(file); // Set to file object
    }
  }

  onMain3FileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.get('Image3File')?.setValue(file); // Set to file object
    }
  }

  onMain2FileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.get('Image2File')?.setValue(file); // Set to file object
    }
  }




  onFormSubmit() {
    if (this.myForm.valid) {
      this.saveProduct();
    } else {
      this.toastService.showError('Please fill out the Required Fields.');
    }
  }

  saveProduct() {
    const formData = new FormData();
    // Append each field of myForm to FormData
    Object.keys(this.myForm.value).forEach(key => {
      formData.append(key, this.myForm.value[key]);
    });
    console.log('formData', formData, this.myForm.value);

    this.apiService.addProductVariant(formData).subscribe(res => {
      this.toastService.showSuccess('Product Variant Added successfully!');
      location.reload()
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError(error);
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }

}
