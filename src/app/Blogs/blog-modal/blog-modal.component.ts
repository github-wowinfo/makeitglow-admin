import { ToastService } from './../../toast.service';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-blog-modal',
  templateUrl: './blog-modal.component.html',
  styleUrls: ['./blog-modal.component.scss']
})
export class BlogModalComponent implements OnInit {

  inputdata: any;
  editData: any;
  errorMessage: string = '';
  options: any[] = [];
  selectedOption: any;
  tagoptions: any[] = [];
  selectedtagOption: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<BlogModalComponent>,
    private builder: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.fetchcat();
    this.fetchtag()
    this.inputdata = this.data;
    if (this.inputdata.id > 0) {
      this.setEditData(this.inputdata.id);
    }
  }


  fetchcat() {
    this.apiService.getblogCategory().subscribe(
      (data: any[]) => {
        console.log('data', data);

        this.options = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  fetchtag() {
    this.apiService.getblogTag().subscribe(
      (data: any[]) => {
        console.log('data', data);

        this.tagoptions = data;
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
    BlogCatgId: this.builder.control('', Validators.required),
    BlogTags: this.builder.control('', Validators.required),
    HeaderTitle: this.builder.control('', Validators.required),
    Description: this.builder.control('', Validators.required),
    Sources: this.builder.control(''),
    MetaTag: this.builder.control(''),
    MetaDescription: this.builder.control(''),
    Thumbnail: ['', Validators.required],
    Image: ['', Validators.required],
  });

  setEditData(id: any) {
    this.apiService.getblogById(id).subscribe(item => {
      this.editData = item;
      this.myForm.setValue({

        BlogCatgId: this.editData.blogCatgId,
        BlogTags: this.editData.blogTags,
        HeaderTitle: this.editData.headerTitle,
        Description: this.editData.description,
        Sources: this.editData.sources,
        MetaTag: this.editData.metaTag,
        MetaDescription: this.editData.metaDescription,
        Thumbnail: this.editData.thumbnail,
        Image: this.editData.image
      });
    });
  }

  onFormSubmit() {
    if (this.myForm.valid) {
      if (this.inputdata.id > 0) {
        this.updateBlog();
      } else {
        this.saveBlog();
      }
    } else {
      this.toastService.showError('Please fill out the Required Fields.');
    }
  }

  updateBlog() {
    const formData = new FormData();
    Object.keys(this.myForm.value).forEach(key => {
      formData.append(key, this.myForm.value[key]);
    });

    // Add the product ID to update
    formData.append('BlogId', this.editData.id);
    console.log('formData', formData, this.myForm.value);
    this.apiService.updateblogById(formData).subscribe(response => {
      // Handle the response as needed
      this.toastService.showSuccess('Blog Updated successfully!');
      this.closepopup();
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError(error);
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }

  saveBlog() {
    const formData = new FormData();
    // Append each field of myForm to FormData
    Object.keys(this.myForm.value).forEach(key => {
      formData.append(key, this.myForm.value[key]);
    });
    console.log('formData', formData, this.myForm.value);
    this.apiService.createblog(formData).subscribe(res => {
      this.toastService.showSuccess('Blog Added successfully!');
      this.closepopup();
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError(error);
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }



  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.get('Thumbnail')?.setValue(file); // Set to file object
    }
  }

  onMain1FileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.get('Image')?.setValue(file); // Set to file object
    }
  }
}
