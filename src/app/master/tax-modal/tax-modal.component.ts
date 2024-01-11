







import { ToastService } from './../../toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-tax-modal',
  templateUrl: './tax-modal.component.html',
  styleUrls: ['./tax-modal.component.scss']
})
export class TaxModalComponent implements OnInit {
  inputdata: any;
  editData: any;
  errorMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<TaxModalComponent>,
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
    taxPercent: this.builder.control('', Validators.required)
  });

  setEditData(id: any) {
    this.apiService.getTaxById(id).subscribe(item => {
      this.editData = item;
      this.myForm.setValue({ taxPercent: this.editData.taxPercent });
    });
  }

  onFormSubmit() {
    if (this.myForm.valid) {
      if (this.inputdata.id > 0) {
        this.updateTaxData();
      } else {
        this.saveTax();
      }
    } else {
      this.toastService.showError('Please fill out the Required Fields.');
    }
  }

  updateTaxData() {
    const updatedData = {
      id: this.editData.taxEntryId,
      ...this.myForm.value
    };

    this.apiService.updateTaxById(updatedData).subscribe(response => {
      // Handle the response as needed
      this.toastService.showSuccess('Tax Rate Updated successfully!');
      this.closepopup();
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError(error);
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }

  saveTax() {
    this.apiService.createTax(this.myForm.value).subscribe(res => {
      this.toastService.showSuccess('Tax Rate Added successfully!');
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
