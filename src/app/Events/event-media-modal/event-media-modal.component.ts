import { ToastService } from './../../toast.service';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-event-media-modal',
  templateUrl: './event-media-modal.component.html',
  styleUrls: ['./event-media-modal.component.scss']
})
export class EventMediaModalComponent implements OnInit {

  inputdata: any;
  editData: any;
  errorMessage: string = '';
  options: any[] = [];
  selectedOption: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<EventMediaModalComponent>,
    private builder: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.inputdata = this.data;
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      const fileArray = [];
      for (let i = 0; i < files.length; i++) {
        fileArray.push(files[i]);
      }
      this.myForm.get('UploadImageFiles')?.setValue(fileArray);
    }
  }

  closepopup() {
    this.ref.close();
  }

  myForm = this.builder.group({
    EventId: this.data.id,
    UploadImageFiles: [[], Validators.required], // Use an array for multiple files
  });

  onFormSubmit() {
    if (this.myForm.valid) {
      this.saveEvent();
    } else {
      this.toastService.showError('Please fill out the Required Fields.');
    }
  }

  saveEvent() {
    const formData = new FormData();
    const files = this.myForm.get('UploadImageFiles')?.value as File[];
    files.forEach((file: File) => {
      formData.append('UploadImageFiles', file);
    });
    formData.append('EventId', this.data.id);
    this.apiService.addeventMedia(formData).subscribe(res => {
      this.toastService.showSuccess('Event Added successfully!');
      this.closepopup();
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError(error);
      }
    );
  }
}
