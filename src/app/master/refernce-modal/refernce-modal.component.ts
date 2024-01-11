



import { ToastService } from './../../toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-refernce-modal',
  templateUrl: './refernce-modal.component.html',
  styleUrls: ['./refernce-modal.component.scss']

})
export class RefernceModalComponent implements OnInit {
  inputdata: any;
  editData: any;
  errorMessage: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<RefernceModalComponent>,
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
    referenceName: this.builder.control('', Validators.required),
  });

  setEditData(id: any) {
    this.apiService.getReferenceById(id).subscribe(item => {
      this.editData = item;
      console.log('item', item);

      this.myForm.setValue({ referenceName: this.editData.referenceName });
    });
  }

  onFormSubmit() {
    if (this.myForm.valid) {
      if (this.inputdata.id > 0) {
        this.updateReferenceData();
      } else {
        this.saveReference();
      }
    } else {
      this.toastService.showError('Please fill out the Required Fields.');
    }
  }

  updateReferenceData() {
    const updatedData = {
      id: this.editData.refEntryId,
      ...this.myForm.value
    };

    this.apiService.updateReferenceById(updatedData).subscribe(response => {
      // Handle the response as needed
      this.toastService.showSuccess('Reference Updated successfully!');
      this.closepopup();
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError('Error While Updating');
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }

  saveReference() {
    this.apiService.createReference(this.myForm.value).subscribe(res => {
      this.toastService.showSuccess('Reference Added successfully!');
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


