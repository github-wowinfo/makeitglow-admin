import { ToastService } from './../../toast.service';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-featured-modal',
  templateUrl: './featured-modal.component.html',
  styleUrls: ['./featured-modal.component.scss']
})
export class FeaturedModalComponent implements OnInit {


  inputdata: any;
  errorMessage: string = '';
  options: any[] = [];
  selectedOption: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<FeaturedModalComponent>,
    private builder: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.varaintlist();
    // this.fetchtag()
    this.inputdata = this.data;
    // if (this.inputdata.id > 0) {
    //   this.setEditData(this.inputdata.id);
    // }
  }


  varaintlist() {
    this.apiService.getAllVariant().subscribe(
      (data: any[]) => {
        console.log('data', data);

        this.options = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  // fetchtag() {
  //   this.apiService.getblogTag().subscribe(
  //     (data: any[]) => {
  //       console.log('data', data);

  //       this.tagoptions = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }

  closepopup() {
    this.ref.close();
  }

  myForm = this.builder.group({
    itmVrntId: this.builder.control('', Validators.required),
    fptSequenceNo: this.builder.control('', Validators.required)
  });



  onFormSubmit() {
    if (this.myForm.valid) {
      this.saveFeature();
    } else {
      this.toastService.showError('Please fill out the Required Fields.');
    }
  }



  saveFeature() {
    // const formData = new FormData();
    // // Append each field of myForm to FormData
    // Object.keys(this.myForm.value).forEach(key => {
    //   formData.append(key, this.myForm.value[key]);
    // });
    // console.log('formData', formData, this.myForm.value);
    this.apiService.addFeaturedProduct(this.myForm.value).subscribe(res => {
      this.toastService.showSuccess('Featured Product Added successfully!');
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
