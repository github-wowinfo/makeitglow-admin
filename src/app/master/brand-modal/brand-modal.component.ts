import { ToastService } from './../../toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-brand-modal',
  templateUrl: './brand-modal.component.html',
  styleUrls: ['./brand-modal.component.scss']
})
export class BrandModalComponent implements OnInit {
  inputdata: any;
  editData: any;
  errorMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<BrandModalComponent>,
    private builder: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.inputdata = this.data;
    if (this.inputdata.id > 0) {
      this.setEditData(this.inputdata.id);
    }
  }

  closepopup() {
    this.ref.close();
  }

  myForm = this.builder.group({
    brndName: this.builder.control('', Validators.required)
  });

  setEditData(id: any) {
    this.apiService.getBrandById(id).subscribe(item => {
      this.editData = item;
      this.myForm.setValue({ brndName: this.editData.brndName });
    });
  }

  onFormSubmit() {
    if (this.myForm.valid) {
      if (this.inputdata.id > 0) {
        this.updateBrandData();
      } else {
        this.saveBrand();
      }
    } else {
      this.toastService.showError('Please fill out the brand name.');
    }
  }

  updateBrandData() {
    const updatedData = {
      id: this.editData.brandId,
      ...this.myForm.value
    };

    this.apiService.updateBrandById(updatedData).subscribe(response => {
      // Handle the response as needed
      this.toastService.showSuccess('Brand Updated successfully!');
      this.closepopup();
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError(error);
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }

  saveBrand() {
    this.apiService.createBrand(this.myForm.value).subscribe(res => {
      this.toastService.showSuccess('Brand Added successfully!');
      this.closepopup();
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError(error);
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }
}
