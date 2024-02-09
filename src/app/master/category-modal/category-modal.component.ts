
import { ToastService } from './../../toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit {
  inputdata: any;
  editData: any;
  errorMessage: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<CategoryModalComponent>,
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
    catgName: this.builder.control('', Validators.required),
    catDescription: this.builder.control(''),
    metaTags: this.builder.control(''),
    metapropertyurl: this.builder.control(''),
    metapropertytype: this.builder.control(''),
    metapropertytitle: this.builder.control(''),
    metapropertydescription: this.builder.control('')
  });

  setEditData(id: any) {
    this.apiService.getCategoryById(id).subscribe(item => {
      this.editData = item;
      this.myForm.setValue({
        catgName: this.editData.catgName,
        catDescription: this.editData.catDescription,
        metaTags: this.editData.metaTags,
        metapropertyurl: this.editData.metapropertyurl,
        metapropertytype: this.editData.metapropertytype,
        metapropertytitle: this.editData.metapropertytitle,
        metapropertydescription: this.editData.metapropertydescription,
      });
    });
  }

  onFormSubmit() {
    if (this.myForm.valid) {
      if (this.inputdata.id > 0) {
        this.updateCatData();
      } else {
        this.saveCat();
      }
    } else {
      this.toastService.showError('Please fill out the Required Fields.');
    }
  }

  updateCatData() {
    const updatedData = {
      catgEntryId: this.editData.catgEntryId,
      ...this.myForm.value
    };

    this.apiService.updateCategoryById(updatedData).subscribe(response => {
      // Handle the response as needed
      this.toastService.showSuccess('Category Updated successfully!');
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
    this.apiService.createCategory(this.myForm.value).subscribe(res => {
      this.toastService.showSuccess('Category Added successfully!');
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

