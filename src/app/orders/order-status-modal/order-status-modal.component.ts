import { ToastService } from './../../toast.service';
import { ApiService } from 'src/app/api.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-status-modal',
  template: `
    <form [formGroup]="orderStatusForm" >
    <div mat-dialog-content>
        <mat-form-field>
            <mat-label>Remark</mat-label>
            <input formControlName="remark" matInput>
        </mat-form-field>
    </div>
    <div mat-dialog-actions>
        <button mat-raised-button color="primary" (click)="updateOrderStatus()">Update Status</button>
    </div>
</form>
  `,
})
export class OrderStatusModalComponent {
  orderStatusForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<OrderStatusModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { oid: number, status: number },
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastService,
  ) {
    this.orderStatusForm = this.fb.group({
      remark: ['', Validators.required],
    });
  }

  updateOrderStatus() {
    if (this.orderStatusForm.valid) {
      const requestBody = {
        oid: this.data.oid,
        status: this.data.status,
        remark: this.orderStatusForm.value.remark,
      };

      this.apiService.updateorderStatus(requestBody).subscribe(res => {
        this.toastService.showSuccess('Status Updated successfully!');
        this.dialogRef.close();
      }),
        (error) => {
          console.error('Error creating post:', error);
          this.toastService.showError(error);
          // Optionally, you can handle errors, show a message, etc.
        }
      // Call your API to update order status
      // You can use Angular HttpClient for this

      // Close the modal when done

    }
  }
}
