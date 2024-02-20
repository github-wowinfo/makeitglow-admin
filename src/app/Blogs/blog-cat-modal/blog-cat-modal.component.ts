import { ToastService } from './../../toast.service';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-blog-cat-modal',
  templateUrl: './blog-cat-modal.component.html',
  styleUrls: ['./blog-cat-modal.component.scss']
})
export class BlogCatModalComponent implements OnInit {

  inputdata: any;
  editData: any;
  errorMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<BlogCatModalComponent>,
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
    blogCatgName: this.builder.control('', Validators.required)
  });

  setEditData(id: any) {
    this.apiService.getblogCategoryById(id).subscribe(item => {
      this.editData = item;
      this.myForm.setValue({ blogCatgName: this.editData.blogCatgName });
    });
  }

  onFormSubmit() {
    if (this.myForm.valid) {
      if (this.inputdata.id > 0) {
        this.updateCat();
      } else {
        this.saveCat();
      }
    } else {
      this.toastService.showError('Please fill out the Required Fields.');
    }
  }

  updateCat() {
    const updatedData = {
      id: this.editData.id,
      ...this.myForm.value
    };

    this.apiService.updateblogCategoryById(updatedData).subscribe(response => {
      // Handle the response as needed
      this.toastService.showSuccess('Blog Category Updated successfully!');
      this.closepopup();
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError(error);
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }

  saveCat() {
    this.apiService.createblogCategory(this.myForm.value).subscribe(res => {
      this.toastService.showSuccess('Blog Category Added successfully!');
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
