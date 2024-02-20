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
  isUpdate: boolean = false; // Track if it's in update mode
  variantIdToUpdate: string = '';
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
      this.variantIdToUpdate = params.get('variantId') || '';
      if (this.variantIdToUpdate) {
        // Populate form for update
        this.isUpdate = true;
        this.populateFormForUpdate();
      }
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

  populateFormForUpdate() {
    // Use the productIdToUpdate to fetch the existing product data and populate the form
    // Example:
    this.apiService.getVariantProductById(this.variantIdToUpdate).subscribe(
      (data: any) => {
        console.log('data', data);
        // const mfgDate = new Date(data.mfgDate);
        // const day = mfgDate.getDate().toString().padStart(2, '0'); // Add zero padding for single-digit days
        // const month = (mfgDate.getMonth() + 1).toString().padStart(2, '0'); // Add zero padding for single-digit months
        // const year = mfgDate.getFullYear();
        // const formattedMfgDate = `${day}/${month}/${year}`;

        this.myForm.patchValue({
          Srno: data.srno || '',
          BarCodeNo: data.barCodeNo || '',
          ItemTitle: data.itemTitle || '',
          HowToUse: data.howToUse || '',
          UnitVolume: data.unitVolume || '',
          ThumbnailFile: data.thumbnail ? data.thumbnail : '',
          MainImage1File: data.mainImage1 ? data.mainImage1 : '',
          Image2File: data.image2 ? data.image2 : '',
          Image3File: data.image3 ? data.image3 : '',
        });
        console.log('this.myForm.patchValue', this.myForm.patchValue);

      },
      (error) => {
        console.error('Error fetching product data for update:', error);
      }
    );
  }

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
      if (this.isUpdate) {
        this.updateProduct();
      } else {
        this.saveProduct();
      }
    } else {
      this.toastService.showError('Please fill out the Required Fields.');
    }
  }
  updateProduct() {
    const formData = new FormData();
    Object.keys(this.myForm.value).forEach(key => {
      formData.append(key, this.myForm.value[key]);
    });

    // Add the product ID to update
    formData.append('VrntEntryId', this.variantIdToUpdate);
    console.log('formData', formData, this.myForm.value);
    this.apiService.updateVariant(formData).subscribe(res => {
      this.toastService.showSuccess('Variant Updated successfully!');
      // location.reload()
      // Optionally, navigate to a different route or do something else after update
    },
      (error) => {
        console.error('Error updating product:', error);
        this.toastService.showError(error);
      }
    );
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
