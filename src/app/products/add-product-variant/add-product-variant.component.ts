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
  file1: any;
  selectedMainImage: string = ''
  file2: any;
  selectedMainImage2: string = ''
  file3: any;
  selectedMainImage3: string = ''
  file4: any;
  selectedMainImage4: string = ''
  constructor(private apiService: ApiService,
    private builder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      // console.log(this.id);
      this.myForm.get('ItemId')?.setValue(this.id);
      const productId = +params.get('variantId'); // Convert to number

      if (productId && productId > 0) {
        this.variantIdToUpdate = productId.toString(); // Convert back to string if needed
        this.isUpdate = true;
        this.populateFormForUpdate();
      }
      // Retrieve the 'id' parameter from the URL
      // this.id = params.get('id');
      // console.log(this.id);
      // this.myForm.get('ItemId')?.setValue(this.id);
      // this.variantIdToUpdate = params.get('variantId') || '';
      // if (this.variantIdToUpdate) {
      //   // Populate form for update
      //   this.isUpdate = true;
      //   this.populateFormForUpdate();
      // }
    })

  }
  onFileChange(event: any) {
    console.log('events', event);
    if (event.target.files.length > 0) {
      this.file1 = event.target.files[0];
      console.log('events', this.file1);

      this.myForm.get('ThumbnailFile')?.setValue(this.file1);
    }
  }


  onMain1FileChange(event: any) {
    console.log('events', event);
    if (event.target.files.length > 0) {
      this.file2 = event.target.files[0];
      console.log('events', this.file2);

      this.myForm.get('MainImage1File')?.setValue(this.file2);
      // const file = event.target.files[0];
      // this.myForm.get('MainImage1File')?.setValue(file); // Set to file object
    }
  }

  onMain2FileChange(event: any) {
    console.log('events', event);
    if (event.target.files.length > 0) {
      this.file3 = event.target.files[0];
      console.log('events', this.file3);
      this.myForm.get('Image2File')?.setValue(this.file3);
      // const file = event.target.files[0];
      // this.myForm.get('Image3File')?.setValue(file); // Set to file object
    }
  }

  onMain3FileChange(event: any) {
    console.log('events', event);
    if (event.target.files.length > 0) {
      this.file4 = event.target.files[0];
      console.log('events', this.file4);
      this.myForm.get('Image3File')?.setValue(this.file4);
      // const file = event.target.files[0];
      // this.myForm.get('Image2File')?.setValue(file); // Set to file object
    }
  }

  myForm = this.builder.group({
    ItemId: this.builder.control('', Validators.required),
    Srno: this.builder.control(''),
    BarCodeNo: this.builder.control('', Validators.required),
    ItemTitle: this.builder.control('', Validators.required),
    HowToUse: this.builder.control('', Validators.required),
    UnitVolume: this.builder.control('', Validators.required),
    ThumbnailFile: [''],
    MainImage1File: [''],
    Image2File: [''],
    Image3File: [''],
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
        this.selectedMainImage = data.thumbnail ? data.thumbnail : '';
        this.selectedMainImage2 = data.mainImage1 ? data.mainImage1 : '';
        this.selectedMainImage3 = data.image2 ? data.image2 : '';
        this.selectedMainImage4 = data.image3 ? data.image3 : '';

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








  onFormSubmit() {
    if (this.myForm.valid) {
      if (this.isUpdate) {
        this.updateProduct();
      } else {
        if (this.file1 === undefined && this.file2 === undefined && this.file3 === undefined && this.file4 === undefined) {
          this.toastService.showError('Please Add All The Images');
          return
        }
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
