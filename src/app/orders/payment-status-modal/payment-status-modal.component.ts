import { ToastService } from './../../toast.service';
import { ApiService } from 'src/app/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-payment-status-modal',
  template: `
    <form [formGroup]="orderStatusForm" >
    <div mat-dialog-content>
        <mat-form-field>
            <mat-label>Remark</mat-label>
            <textarea matInput formControlName="remark"></textarea>
        </mat-form-field>
    </div>
    <div mat-dialog-actions>
        <button mat-raised-button color="primary" (click)="updateOrderStatus()">Update Status</button>
    </div>
</form>
  `,
  styleUrls: ['./payment-status-modal.component.scss']
})
export class PaymentStatusModalComponent implements OnInit {
  orderStatusForm: FormGroup;
  // constructor() { }

  constructor(
    public dialogRef: MatDialogRef<PaymentStatusModalComponent>,
    // row.oid, $event.value, row.ordrPymnt.paymentType, row.ordrPymnt.txnId,row.ordrPymnt.txnAmount,row.ordrPymnt.txnMode,row.ordrPymnt.refNo
    @Inject(MAT_DIALOG_DATA) public data: { oid: number, status: number, type: number, txnId: string, txnAmount: number, txnMode: number, refNo: string },
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
        type: this.data.type,
        txnId: this.data.txnId,
        txnAmount: this.data.txnAmount,
        txnMode: this.data.txnMode,
        refNo: this.data.refNo
      };

      this.apiService.updateorderStatus(requestBody).subscribe(res => {
        this.toastService.showSuccess('Payment Status Updated successfully!');
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

  ngOnInit(): void {
  }

}
