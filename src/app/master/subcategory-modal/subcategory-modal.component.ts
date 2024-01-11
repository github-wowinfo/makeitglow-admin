
import { ToastService } from './../../toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-subcategory-modal',
  templateUrl: './subcategory-modal.component.html',
  styleUrls: ['./subcategory-modal.component.scss']
})
export class SubcategoryModalComponent implements OnInit {
  inputdata: any;
  editData: any;
  errorMessage: string = '';
  options: any[] = [];
  selectedOption: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<SubcategoryModalComponent>,
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
    this.apiService.getCategory().subscribe(
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
    subCatgName: this.builder.control('', Validators.required),
    categoryId: this.builder.control('', Validators.required),
    metaTags: this.builder.control(''),
    metapropertyurl: this.builder.control(''),
    metapropertytype: this.builder.control(''),
    metapropertytitle: this.builder.control(''),
    metapropertydescription: this.builder.control('')
  });

  setEditData(id: any) {
    this.apiService.getSubCategoryById(id).subscribe(item => {
      this.editData = item;
      this.myForm.setValue({
        subCatgName: this.editData.subCatgName,
        categoryId: this.editData.categoryId,
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
        this.updateSubCatData();
      } else {
        this.saveSubCat();
      }
    } else {
      this.toastService.showError('Please fill out the Required Fields.');
    }
  }

  updateSubCatData() {
    const updatedData = {
      subCatgEntryId: this.editData.subCatgEntryId,
      ...this.myForm.value
    };

    this.apiService.updateSubCategoryById(updatedData).subscribe(response => {
      // Handle the response as needed
      this.toastService.showSuccess('SubCategory Updated successfully!');
      this.closepopup();
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError(error);
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }

  saveSubCat() {
    this.apiService.createSubCategory(this.myForm.value).subscribe(res => {
      this.toastService.showSuccess('SubCategory Added successfully!');
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

