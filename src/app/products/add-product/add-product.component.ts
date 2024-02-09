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
  constructor(
    // @Inject() public data: any,
    // public data: any,
    private apiService: ApiService,
    private builder: FormBuilder,
    private toastService: ToastService,
  ) {
  }


  onFileSelected(event) {
    console.log(event.target.files)
  }
  ngOnInit(): void {
    // this.inputdata = this.data;
    this.brandData();
    this.categoryData();
    this.SubcategoryData();
    this.TaxRate()
  }
  brandData() {
    this.apiService.getPosts().subscribe(
      (data: any[]) => {
        console.log('data', data);

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
        console.log('data', data);

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
        console.log('data', data);

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
        console.log('data', data);

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
    IsAvailabile: this.builder.control(''),
    IsBuyable: this.builder.control(''),
    HexColorCode: this.builder.control('', Validators.required),
    HowToUse: this.builder.control('', Validators.required),
    UnitVolume: this.builder.control('', Validators.required),
    ThumbnailFile: this.builder.control('', Validators.required),
    MainImage1File: this.builder.control('', Validators.required),
    Image2File: this.builder.control('', Validators.required),
    Image3File: this.builder.control('', Validators.required),
  });

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

    this.apiService.addProduct(formData).subscribe(res => {
      this.toastService.showSuccess('Product Added successfully!');
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError(error);
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }
}
