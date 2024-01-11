
import { ToastService } from './../../toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss']
})
export class LocationModalComponent implements OnInit {
  inputdata: any;
  editData: any;
  errorMessage: string = '';
  options: any[] = [];
  selectedOption: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<LocationModalComponent>,
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
    this.apiService.getCity().subscribe(
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
    locationName: this.builder.control('', Validators.required),
    cityId: this.builder.control('', Validators.required),
    zipCode: this.builder.control('', Validators.required),
  });

  setEditData(id: any) {
    this.apiService.getLocationById(id).subscribe(item => {
      this.editData = item;
      this.myForm.setValue({
        locationName: this.editData.locationName,
        cityId: this.editData.cityId,
        zipCode: this.editData.zipCode,
      });
    });
  }

  onFormSubmit() {
    if (this.myForm.valid) {
      if (this.inputdata.id > 0) {
        this.updateLocationData();
      } else {
        this.saveLocation();
      }
    } else {
      this.toastService.showError('Please fill out the Required Fields.');
    }
  }

  updateLocationData() {
    const updatedData = {
      id: this.editData.lEntryId,
      ...this.myForm.value
    };

    this.apiService.updateLocationById(updatedData).subscribe(response => {
      // Handle the response as needed
      this.toastService.showSuccess('Location Updated successfully!');
      this.closepopup();
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError(error);
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }

  saveLocation() {
    this.apiService.createLocation(this.myForm.value).subscribe(res => {
      this.toastService.showSuccess('Location Added successfully!');
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


