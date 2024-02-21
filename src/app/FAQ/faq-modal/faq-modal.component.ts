import { ToastService } from './../../toast.service';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-faq-modal',
  templateUrl: './faq-modal.component.html',
  styleUrls: ['./faq-modal.component.scss']
})
export class FaqModalComponent implements OnInit {


  inputdata: any;
  errorMessage: string = '';
  options: any[] = [];
  selectedOption: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<FaqModalComponent>,
    private builder: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.inputdata = this.data;
  }




  closepopup() {
    this.ref.close();
  }

  myForm = this.builder.group({
    title: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required)
  });



  onFormSubmit() {
    if (this.myForm.valid) {
      this.saveFaq();
    } else {
      this.toastService.showError('Please fill out the Required Fields.');
    }
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
