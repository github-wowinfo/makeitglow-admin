import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteConfirmationComponent>) { }

  ngOnInit(): void {
  }
  cancel(): void {
    this.dialogRef.close(false); // Close the dialog and pass false to indicate cancellation
  }

  confirm(): void {
    this.dialogRef.close(true); // Close the dialog and pass true to indicate confirmation
  }
}


