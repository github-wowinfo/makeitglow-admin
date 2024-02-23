import { ToastService } from './../../toast.service';
import { ApiService } from 'src/app/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-event-modal-new',
  templateUrl: './event-modal-new.component.html',
  styleUrls: ['./event-modal-new.component.scss']
})
export class EventModalNewComponent implements OnInit {

  inputdata: any;
  editData: any;
  errorMessage: string = '';
  options: any[] = [];
  selectedOption: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<EventModalNewComponent>,
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
    description: this.builder.control('', Validators.required),
    eventDate: this.builder.control('', Validators.required)
  });

  setEditData(id: any) {
    this.apiService.geteventById(id).subscribe(item => {
      this.editData = item;
      const eventDate = new Date(item.eventDate);
      const day = eventDate.getDate().toString().padStart(2, '0'); // Add zero padding for single-digit days
      const month = (eventDate.getMonth() + 1).toString().padStart(2, '0'); // Add zero padding for single-digit months
      const year = eventDate.getFullYear();
      const formattedEventDate = `${day}/${month}/${year}`;
      this.myForm.setValue({
        title: this.editData.title,
        description: this.editData.description,
        eventDate: formattedEventDate
      });
    });
  }

  onFormSubmit() {
    if (this.myForm.valid) {
      if (this.inputdata.id > 0) {
        this.updateEvent();
      } else {
        this.saveEvent();
      }
    } else {
      this.toastService.showError('Please fill out the Required Fields.');
    }
  }

  updateEvent() {
    const updatedData = {
      id: this.editData.eventEntryId,
      ...this.myForm.value
    };

    this.apiService.updateevent(updatedData).subscribe(response => {
      // Handle the response as needed
      this.toastService.showSuccess('Event Updated successfully!');
      this.closepopup();
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError(error);
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }



  saveEvent() {
    this.apiService.addevent(this.myForm.value).subscribe(res => {
      this.toastService.showSuccess('Event Added successfully!');
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
