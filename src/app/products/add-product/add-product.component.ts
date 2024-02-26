import { Router, ActivatedRoute } from '@angular/router';
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
  file1: any;
  selectedMainImage: string = ''
  file2: any;
  selectedMainImage2: string = ''
  file3: any;
  selectedMainImage3: string = ''
  file4: any;
  selectedMainImage4: string = ''

  constructor(
    // @Inject() public data: any,
    // public data: any,
    private apiService: ApiService,
    private builder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
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

    // this.route.paramMap.subscribe(params => {
    //   this.productIdToUpdate = params.get('productId') || '';
    //   if (this.productIdToUpdate) {
    //     // Populate form for update
    //     this.isUpdate = true;
    //     this.populateFormForUpdate();
    //   }
    // });

    this.route.paramMap.subscribe(params => {
      const productId = +params.get('productId'); // Convert to number

      if (productId && productId > 0) {
        this.productIdToUpdate = productId.toString(); // Convert back to string if needed
        this.isUpdate = true;
        this.populateFormForUpdate();
      }
    });
    // Example: Initialize isUpdate and productIdToUpdate directly
    // const updateMode = true; // Set to true if in update mode
    // const productId = 'your_product_id_here'; // Set the product ID to update
    // if (updateMode) {
    //   this.isUpdate = true;
    //   this.productIdToUpdate = productId;
    //   this.populateFormForUpdate();
    // }
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
    Srno: this.builder.control(''),
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

  onMain3FileChange(event: any) {
    console.log('events', event);
    if (event.target.files.length > 0) {
      this.file3 = event.target.files[0];
      this.myForm.get('Image2File')?.setValue(this.file3);
      // const file = event.target.files[0];
      // this.myForm.get('Image3File')?.setValue(file); // Set to file object
    }
  }

  onMain2FileChange(event: any) {
    console.log('events', event);
    if (event.target.files.length > 0) {
      this.file4 = event.target.files[0];
      this.myForm.get('Image3File')?.setValue(this.file4);
      // const file = event.target.files[0];
      // this.myForm.get('Image2File')?.setValue(file); // Set to file object
    }
  }

  populateFormForUpdate() {
    // Use the productIdToUpdate to fetch the existing product data and populate the form
    // Example:
    this.apiService.getProductById(this.productIdToUpdate).subscribe(
      (data: any) => {
        console.log('data', data.vrnts[0].mainImage1);
        const mfgDate = new Date(data.mfgDate);
        const day = mfgDate.getDate().toString().padStart(2, '0'); // Add zero padding for single-digit days
        const month = (mfgDate.getMonth() + 1).toString().padStart(2, '0'); // Add zero padding for single-digit months
        const year = mfgDate.getFullYear();
        const formattedMfgDate = `${day}/${month}/${year}`;
        this.selectedMainImage = data.thumbnail ? data.thumbnail : '';
        this.selectedMainImage2 = data.vrnts[0].mainImage1 ? data.vrnts[0].mainImage1 : '';
        this.selectedMainImage3 = data.vrnts[0].image2 ? data.vrnts[0].image2 : '';
        this.selectedMainImage4 = data.vrnts[0].image3 ? data.vrnts[0].image3 : '';

        this.myForm.patchValue({
          BrndId: data.brndId || '',
          CategoryId: data.categoryId || '',
          SubCategoryId: data.subCategoryId || '',
          ItemName: data.itemName || '',
          ShortDescription: data.shortDescription || '',
          UnitType: data.unitType || '',
          TaxId: data.taxId || '',
          LongDescription: data.longDescription || '',
          Benefits: data.benefits || '',
          HasDiemension: data.hasDiemension || '',
          BatchCode: data.batchCode || '',
          BatchInfo: data.batchInfo || '',
          MfgAt: data.mfgAt || '',
          MfgBy: data.mfgBy || '',
          MfgDateValue: formattedMfgDate || '',
          WarrantyInMonth: data.warrantyInMonth || '',
          Remark: data.remark || '',
          VendorInfo: data.vendorInfo || '',
          Policy: data.policy || '',
          MetaTags: data.metaTags || '',
          Metapropertyurl: data.metapropertyurl || '',
          Metapropertytype: data.metapropertytype || '',
          Metapropertytitle: data.metapropertytitle || '',
          Metapropertydescription: data.metapropertydescription || '',
          Srno: data.vrnts[0].srno || '',
          BarCodeNo: data.vrnts[0].barCodeNo || '',
          ItemTitle: data.vrnts[0].itemTitle || '',
          IsAvailabile: data.vrnts[0].isAvailabile || '',
          IsBuyable: data.vrnts[0].isBuyable || '',
          HexColorCode: data.vrnts[0].hexColorCode || '',
          HowToUse: data.vrnts[0].howToUse || '',
          UnitVolume: data.vrnts[0].unitVolume || '',
          ThumbnailFile: data.thumbnail ? data.thumbnail : '',
          MainImage1File: data.vrnts[0].mainImage1 ? data.vrnts[0].mainImage1 : '',
          Image2File: data.vrnts[0].image2 ? data.vrnts[0].image2 : '',
          Image3File: data.vrnts[0].image3 ? data.vrnts[0].image3 : '',
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
    formData.append('ItemEntryId', this.productIdToUpdate);
    console.log('formData', formData, this.myForm.value);
    this.apiService.updateProduct(formData).subscribe(res => {
      this.toastService.showSuccess('Product Updated successfully!');
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

    this.apiService.addProduct(formData).subscribe(res => {
      this.toastService.showSuccess('Product Added successfully!');
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
