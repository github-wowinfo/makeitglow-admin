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


  url : any ;
  msg =''
  onFileChange(event: any) {
    console.log('events', event);
    if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}

    if (event.target.files.length > 0) {
      this.file1 = event.target.files[0];
      this.myForm.get('ThumbnailFile')?.setValue(this.file1); // Set to file object
    }
  }

  url1 : any ;
  onMain1FileChange(event: any) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url1 = reader.result; 
		}

    if (event.target.files.length > 0) {
      this.file2 = event.target.files[0];
      this.myForm.get('MainImage1File')?.setValue(this.file2);
      // const file = event.target.files[0];
      // this.myForm.get('MainImage1File')?.setValue(file); // Set to file object
    }
  }

  url3 : any ;
  onMain3FileChange(event: any) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url3 = reader.result; 
		}
    
    if (event.target.files.length > 0) {
      this.file3 = event.target.files[0];
      this.myForm.get('Image2File')?.setValue(this.file3);
      // const file = event.target.files[0];
      // this.myForm.get('Image3File')?.setValue(file); // Set to file object
    }
  }

  url2 : any ;
  onMain2FileChange(event: any) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url2 = reader.result; 
		}

    if (event.target.files.length > 0) {
      this.file4 = event.target.files[0];
      this.myForm.get('Image3File')?.setValue(this.file4);
      // const file = event.target.files[0];
      // this.myForm.get('Image2File')?.setValue(file); // Set to file object
    }
  }

  myForm = this.builder.group({
    BrndId: this.builder.control('', Validators.required),
    CategoryId: this.builder.control('', Validators.required),
    SubCategoryId: this.builder.control(''),
    ItemName: this.builder.control('', Validators.required),
    ItemSKUID: this.builder.control(''),
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
    // Srno: this.builder.control('', Validators.required),
    BarCodeNo: this.builder.control('', Validators.required),
    ItemTitle: this.builder.control('', Validators.required),
    IsAvailabile: this.builder.control('', Validators.required),
    IsBuyable: this.builder.control('', Validators.required),
    HexColorCode: this.builder.control('', Validators.required),
    WebsiteMoq: this.builder.control(''),
    HowToUse: this.builder.control('', Validators.required),

    ThumbnailFile: [''],
    MainImage1File: [''],
    Image2File: [''],
    Image3File: [''],
  });



  populateFormForUpdate() {
    // Use the productIdToUpdate to fetch the existing product data and populate the form
    // Example:

    let passData: any
    this.apiService.getGiftById(this.productIdToUpdate).subscribe(
      (data: any) => {
        passData = data;
        console.log('this.myForm.patchValue', passData);

        const mfgDate = new Date(passData.mfgDate);
        const day = mfgDate.getDate().toString().padStart(2, '0'); // Add zero padding for single-digit days
        const month = (mfgDate.getMonth() + 1).toString().padStart(2, '0'); // Add zero padding for single-digit months
        const year = mfgDate.getFullYear();
        const formattedMfgDate = `${day}/${month}/${year}`;

        this.selectedMainImage = passData.thumbnail ? passData.thumbnail : '';
        this.selectedMainImage2 = passData.mainImage1 ? passData.mainImage1 : '';
        this.selectedMainImage3 = passData.image2 ? passData.image2 : '';
        this.selectedMainImage4 = passData.image3 ? passData.image3 : '';

        let patch = {
          BrndId: passData.brndId || '',
          CategoryId: passData.categoryId || '',
          SubCategoryId: passData.subCategoryId || '',
          ItemName: passData.itemName || '',
          ShortDescription: passData.shortDescription || '',
          UnitType: passData.unitType || '',
          TaxId: passData.taxId || '',
          LongDescription: passData.longDescription || '',
          Benefits: passData.benefits || '',
          HasDiemension: passData.hasDiemension || '',
          BatchCode: passData.batchCode || '',
          BatchInfo: passData.batchInfo || '',
          MfgAt: passData.mfgAt || '',
          MfgBy: passData.mfgBy || '',
          MfgDate: formattedMfgDate || '',
          WarrantyInMonth: passData.warrantyInMonth || '',
          Remark: passData.remark || '',
          VendorInfo: passData.vendorInfo || '',
          Policy: passData.policy || '',
          MetaTags: passData.metaTags || '',
          WebsiteMoq: passData.websiteMoq || '',
          Metapropertyurl: passData.metapropertyurl || '',
          Metapropertytype: passData.metapropertytype || '',
          Metapropertytitle: passData.metapropertytitle || '',
          Metapropertydescription: passData.metapropertydescription || '',
          Srno: passData.srno || '',
          BarCodeNo: passData.barCodeNo || '',
          ItemTitle: passData.itemTitle || '',
          IsAvailabile: passData.isAvailabile || '',
          IsBuyable: passData.isBuyable || '',
          HexColorCode: passData.hexColorCode || '',
          HowToUse: passData.howToUse || '',
          ItemSKUID: passData.ItemSKUID || '',
          ThumbnailFile: passData.thumbnail ? passData.thumbnail : '',
          MainImage1File: passData.mainImage1 ? passData.mainImage1 : '',
          Image2File: passData.image2 ? passData.image2 : '',
          Image3File: passData.image3 ? passData.image3 : '',
        };

        this.myForm.patchValue(patch)

        console.log('my`form', patch);
      },
      (error) => {
        console.error('Error fetching product data for update:', error);
      }
    );






  }


  onFormSubmit() {
    console.log('this', this.myForm, this.file1);

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
    formData.append('GftItmEntryId', this.productIdToUpdate);
    console.log('formData', formData, this.myForm.value);
    this.apiService.updateGift(formData).subscribe(res => {
      this.toastService.showSuccess('Gift Updated successfully!');
      this.router.navigate(['/giftList']);
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

    this.apiService.addGift(formData).subscribe(res => {
      this.toastService.showSuccess('Gift Added successfully!');
      // location.reload()
      this.router.navigate(['/giftList']);
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError(error);
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }
}
