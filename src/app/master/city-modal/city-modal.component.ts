
import { ToastService } from './../../toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-city-modal',
  templateUrl: './city-modal.component.html',
  styleUrls: ['./city-modal.component.scss']
})
export class CityModalComponent implements OnInit {
  inputdata: any;
  editData: any;
  errorMessage: string = '';
  options: any[] = [];
  selectedOption: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<CityModalComponent>,
    private builder: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.fetchData();
    this.inputdata = this.data;
    if (this.inputdata.id > 0) {
      this.setEditData(this.inputdata.id);
    }
  }


  fetchData() {
    this.apiService.getCountry().subscribe(
      (data: any[]) => {
        console.log('data', data);

        this.options = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  closepopup() {
    this.ref.close();
  }

  myForm = this.builder.group({
    cityName: this.builder.control('', Validators.required),
    countryId: this.builder.control('', Validators.required),
  });

  setEditData(id: any) {
    this.apiService.getCityById(id).subscribe(item => {
      this.editData = item;
      this.myForm.setValue({
        cityName: this.editData.cityName,
        countryId: this.editData.countryId,
      });
    });
  }

  onFormSubmit() {
    if (this.myForm.valid) {
      if (this.inputdata.id > 0) {
        this.updateCityData();
      } else {
        this.saveCity();
      }
    } else {
      this.toastService.showError('Please fill out the Required Fields.');
    }
  }

  updateCityData() {
    const updatedData = {
      id: this.editData.cityEntryId,
      ...this.myForm.value
    };

    this.apiService.updateCityById(updatedData).subscribe(response => {
      // Handle the response as needed
      this.toastService.showSuccess('City Updated successfully!');
      this.closepopup();
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError(error);
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }

  saveCity() {
    this.apiService.createCity(this.myForm.value).subscribe(res => {
      this.toastService.showSuccess('City Added successfully!');
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


