import { ToastService } from './../../toast.service';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-faq-modal-new',
  templateUrl: './faq-modal-new.component.html',
  styleUrls: ['./faq-modal-new.component.scss']
})
export class FaqModalNewComponent implements OnInit {


  inputdata: any;
  editData: any;
  errorMessage: string = '';
  options: any[] = [];
  selectedOption: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<FaqModalNewComponent>,
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
    title: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required)
  });

  setEditData(id: any) {
    this.apiService.getfaqById(id).subscribe(item => {
      this.editData = item;
      this.myForm.setValue({
        title: this.editData.title,
        description: this.editData.description,
      });
    });
  }

  onFormSubmit() {
    if (this.myForm.valid) {
      if (this.inputdata.id > 0) {
        this.updateFaq();
      } else {
        this.saveFaq();
      }
    } else {
      this.toastService.showError('Please fill out the Required Fields.');
    }
  }

  updateFaq() {
    const updatedData = {
      id: this.editData.faqEntryId,
      ...this.myForm.value
    };

    this.apiService.updatefaq(updatedData).subscribe(response => {
      // Handle the response as needed
      this.toastService.showSuccess('Faq Updated successfully!');
      this.closepopup();
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError(error);
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }



  saveFaq() {
    this.apiService.addfaq(this.myForm.value).subscribe(res => {
      this.toastService.showSuccess('Faq Added successfully!');
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
