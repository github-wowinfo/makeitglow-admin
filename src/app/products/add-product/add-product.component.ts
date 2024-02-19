import { ToastService } from './../../toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../api.service';
import { Component, Input, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  inputdata: any;
  errorMessage: string = '';
  options: any[] = [];
  selectedOption: any;
  catoptions: any[] = [];
  catselectedOption: any;
  subcatoptions: any[] = [];
  subcatselectedOption: any;
  taxoptions: any[] = [];
  taxselectedOption: any;
  selectedFileName: string = '';
  isUpdate: boolean = false; // Track if it's in update mode
  productIdToUpdate: string = ''; // Product ID to update
  constructor(
    // @Inject() public data: any,
    // public data: any,
    private apiService: ApiService,
    private builder: FormBuilder,
    private toastService: ToastService,
  ) {
  }


  // onFileSelected(event) {
  //   console.log(event.target.files)
  // }
  ngOnInit(): void {
    // this.inputdata = this.data;
    this.brandData();
    this.categoryData();
    this.SubcategoryData();
    this.TaxRate()
    // Example: Initialize isUpdate and productIdToUpdate directly
    const updateMode = true; // Set to true if in update mode
    const productId = 'your_product_id_here'; // Set the product ID to update
    if (updateMode) {
      this.isUpdate = true;
      this.productIdToUpdate = productId;
      this.populateFormForUpdate();
    }
  }
  brandData() {
    this.apiService.getPosts().subscribe(
      (data: any[]) => {
        // console.log('data', data);

        this.options = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  categoryData() {
    this.apiService.getCategory().subscribe(
      (data: any[]) => {
        // console.log('data', data);

        this.catoptions = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  SubcategoryData() {
    this.apiService.getsubCategory().subscribe(
      (data: any[]) => {
        // console.log('data', data);

        this.subcatoptions = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  TaxRate() {
    this.apiService.getTax().subscribe(
      (data: any[]) => {
        // console.log('data', data);

        this.taxoptions = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  myForm = this.builder.group({
    BrndId: this.builder.control('', Validators.required),
    CategoryId: this.builder.control('', Validators.required),
    SubCategoryId: this.builder.control(''),
    ItemName: this.builder.control('', Validators.required),
    ShortDescription: this.builder.control('', Validators.required),
    UnitType: this.builder.control('', Validators.required),
    TaxId: this.builder.control(''),
    LongDescription: this.builder.control('', Validators.required),
    Benefits: this.builder.control(''),
    HasDiemension: this.builder.control(''),
    BatchCode: this.builder.control(''),
    BatchInfo: this.builder.control(''),
    MfgAt: this.builder.control(''),
    MfgBy: this.builder.control(''),
    MfgDateValue: this.builder.control('', Validators.required),
    WarrantyInMonth: this.builder.control(''),
    Remark: this.builder.control(''),
    VendorInfo: this.builder.control(''),
    Policy: this.builder.control(''),
    MetaTags: this.builder.control(''),
    Metapropertyurl: this.builder.control(''),
    Metapropertytype: this.builder.control(''),
    Metapropertytitle: this.builder.control(''),
    Metapropertydescription: this.builder.control(''),
    Srno: this.builder.control('', Validators.required),
    BarCodeNo: this.builder.control('', Validators.required),
    ItemTitle: this.builder.control('', Validators.required),
    IsAvailabile: this.builder.control(true),
    IsBuyable: this.builder.control(true),
    HexColorCode: this.builder.control('', Validators.required),
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

  populateFormForUpdate() {
    // Use the productIdToUpdate to fetch the existing product data and populate the form
    // Example:
    // this.apiService.getProductById(this.productIdToUpdate).subscribe(
    //   (data: any) => {
    //     this.myForm.patchValue(data);
    //   },
    //   (error) => {
    //     console.error('Error fetching product data for update:', error);
    //   }
    // );
  }


  onFormSubmit() {
    // if (this.myForm.valid) {
    //   this.saveProduct();
    // } else {
    //   this.toastService.showError('Please fill out the Required Fields.');
    // }
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
    formData.append('id', this.productIdToUpdate);

    this.apiService.updateProduct(formData).subscribe(res => {
      this.toastService.showSuccess('Product Updated successfully!');
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

    this.apiService.addProduct(formData).subscribe(res => {
      this.toastService.showSuccess('Product Added successfully!');
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
