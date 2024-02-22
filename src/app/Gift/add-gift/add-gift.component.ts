import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from './../../toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-gift',
  templateUrl: './add-gift.component.html',
  styleUrls: ['./add-gift.component.scss']
})
export class AddGiftComponent implements OnInit {

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
    //   this.productIdToUpdate = params.get('giftId') || '';
    //   console.log(this.productIdToUpdate);

    //   if (this.productIdToUpdate) {
    //     // Populate form for update
    //     this.isUpdate = true;
    //     this.populateFormForUpdate();
    //   }
    // });

    this.route.paramMap.subscribe(params => {
      const giftId = +params.get('giftId'); // Convert to number

      if (giftId && giftId > 0) {
        this.productIdToUpdate = giftId.toString(); // Convert back to string if needed
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
    ItemSKUID: this.builder.control('', Validators.required),
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
    MfgDate: this.builder.control('', Validators.required),
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
    IsAvailabile: this.builder.control('', Validators.required),
    IsBuyable: this.builder.control('', Validators.required),
    HexColorCode: this.builder.control('', Validators.required),
    WebsiteMoq: this.builder.control('', Validators.required),
    HowToUse: this.builder.control('', Validators.required),

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
    this.apiService.getGiftById(this.productIdToUpdate).subscribe(
      (data: any) => {
        console.log('data', data);
        const mfgDate = new Date(data.mfgDate);
        const day = mfgDate.getDate().toString().padStart(2, '0'); // Add zero padding for single-digit days
        const month = (mfgDate.getMonth() + 1).toString().padStart(2, '0'); // Add zero padding for single-digit months
        const year = mfgDate.getFullYear();
        const formattedMfgDate = `${day}/${month}/${year}`;

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
          MfgDate: formattedMfgDate || '',
          WarrantyInMonth: data.warrantyInMonth || '',
          Remark: data.remark || '',
          VendorInfo: data.vendorInfo || '',
          Policy: data.policy || '',
          MetaTags: data.metaTags || '',
          WebsiteMoq: data.websiteMoq || '',
          Metapropertyurl: data.metapropertyurl || '',
          Metapropertytype: data.metapropertytype || '',
          Metapropertytitle: data.metapropertytitle || '',
          Metapropertydescription: data.metapropertydescription || '',
          Srno: data.srno || '',
          BarCodeNo: data.barCodeNo || '',
          ItemTitle: data.itemTitle || '',
          IsAvailabile: data.isAvailabile || '',
          IsBuyable: data.isBuyable || '',
          HexColorCode: data.hexColorCode || '',
          HowToUse: data.howToUse || '',
          ItemSKUID: data.ItemSKUID || '',
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
    formData.append('GftItmEntryId', this.productIdToUpdate);
    console.log('formData', formData, this.myForm.value);
    this.apiService.updateGift(formData).subscribe(res => {
      this.toastService.showSuccess('Gift Updated successfully!');
      location.reload()
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

    this.apiService.addGift(formData).subscribe(res => {
      this.toastService.showSuccess('Gift Added successfully!');
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
