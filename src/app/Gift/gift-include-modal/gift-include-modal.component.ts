import { ToastService } from './../../toast.service';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-gift-include-modal',
  templateUrl: './gift-include-modal.component.html',
  styleUrls: ['./gift-include-modal.component.scss']
})
export class GiftIncludeModalComponent implements OnInit {

  inputdata: any;
  errorMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<GiftIncludeModalComponent>,
    private builder: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.inputdata = this.data;
    // if (this.inputdata.id > 0) {
    //   this.setEditData(this.inputdata.id);
    // }
  }

  closepopup() {
    this.ref.close();
  }

  myForm = this.builder.group({
    gftId: this.data.id,
    includedItemName: this.builder.control('', Validators.required)
  });



  onFormSubmit() {
    if (this.myForm.valid) {
      this.saveBrand();
    } else {
      this.toastService.showError('Please fill out the Required Fields.');
    }
  }

  // updateBrandData() {
  //   const updatedData = {
  //     id: this.editData.brandId,
  //     ...this.myForm.value
  //   };

  //   this.apiService.updateBrandById(updatedData).subscribe(response => {
  //     // Handle the response as needed
  //     this.toastService.showSuccess('Brand Updated successfully!');
  //     this.closepopup();
  //   },
  //     (error) => {
  //       console.error('Error creating post:', error);
  //       this.toastService.showError(error);
  //       // Optionally, you can handle errors, show a message, etc.
  //     }
  //   );
  // }

  saveBrand() {
    this.apiService.addGiftIncludes(this.myForm.value).subscribe(res => {
      this.toastService.showSuccess('Includes Added successfully!');
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
