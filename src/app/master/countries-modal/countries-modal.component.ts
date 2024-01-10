import { ToastService } from './../../toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-countries-modal',
  templateUrl: './countries-modal.component.html',
  styleUrls: ['./countries-modal.component.scss']
})
export class CountriesModalComponent implements OnInit {
  inputdata: any;
  editData: any;
  errorMessage: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<CountriesModalComponent>,
    private builder: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastService,) { }

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
    countryName: this.builder.control('', Validators.required),
    phoneCode: this.builder.control('', Validators.required)
  });

  setEditData(id: any) {
    this.apiService.getCountryById(id).subscribe(item => {
      this.editData = item;
      console.log('item', item);

      this.myForm.setValue({ countryName: this.editData.countryName, phoneCode: this.editData.phoneCode });
    });
  }

  onFormSubmit() {
    if (this.myForm.valid) {
      if (this.inputdata.id > 0) {
        this.updateCountryData();
      } else {
        this.saveCountry();
      }
    } else {
      this.toastService.showError('Please fill out all the fields.');
    }
  }

  updateCountryData() {
    const updatedData = {
      id: this.editData.countyEntryId,
      ...this.myForm.value
    };

    this.apiService.updateCountryById(updatedData).subscribe(response => {
      // Handle the response as needed
      this.toastService.showSuccess('Country Updated successfully!');
      this.closepopup();
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError('Error While Updating');
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }

  saveCountry() {
    this.apiService.createCountry(this.myForm.value).subscribe(res => {
      this.toastService.showSuccess('Country Added successfully!');
      this.closepopup();
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError('Error While Adding');
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }

}
