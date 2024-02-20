import { ToastService } from './../../toast.service';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-blog-tag-modal',
  templateUrl: './blog-tag-modal.component.html',
  styleUrls: ['./blog-tag-modal.component.scss']
})
export class BlogTagModalComponent implements OnInit {

  inputdata: any;
  editData: any;
  errorMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<BlogTagModalComponent>,
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
    blogTagName: this.builder.control('', Validators.required)
  });

  setEditData(id: any) {

    this.apiService.getblogTagById(id).subscribe(item => {
      this.editData = item;
      this.myForm.setValue({ blogTagName: this.editData.btagName });
    });
  }

  onFormSubmit() {
    if (this.myForm.valid) {
      if (this.inputdata.id > 0) {
        this.updateTag();
      } else {
        this.saveTag();
      }
    } else {
      this.toastService.showError('Please fill out the Required Fields.');
    }
  }

  updateTag() {
    const updatedData = {
      id: this.editData.btEntryId,
      ...this.myForm.value
    };

    this.apiService.updateblogTagById(updatedData).subscribe(response => {
      // Handle the response as needed
      this.toastService.showSuccess('Blog Tag Updated successfully!');
      this.closepopup();
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError(error);
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }

  saveTag() {
    this.apiService.createblogTag(this.myForm.value).subscribe(res => {
      this.toastService.showSuccess('Blog Tag Added successfully!');
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
