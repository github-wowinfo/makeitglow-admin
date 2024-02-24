import { PaymentStatusModalComponent } from './../payment-status-modal/payment-status-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from './../../toast.service';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService, private toastService: ToastService, private dialog: MatDialog) { }
  id: string;
  order: any = [];
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Retrieve the 'id' parameter from the URL
      this.id = params.get('id');
      console.log(this.id);
      this.orderDetails(this.id)
    })
  }

  orderDetails(id) {
    this.apiService.getorderById(id).subscribe(
      (response) => {
        this.order = response
        console.log('response', response);

      },
      (error) => {
        console.error('Error creating post:', error);
        // Optionally, you can handle errors, show a message, etc.
      }
    )
  }
  // order.ordrPymnt.paymentType, order.ordrPymnt.txnId,order.ordrPymnt.txnAmount,order.ordrPymnt.txnMode,order.ordrPymnt.refNo
  openPaymentStatusModal(oid: number, status: number, type: number, txnId: string, txnAmount: number, txnMode: number, refNo: string) {
    const dialogRef = this.dialog.open(PaymentStatusModalComponent, {
      data: { oid, status, type, txnId, txnAmount, txnMode, refNo },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.neworder()
      // Handle any result or action after the modal is closed
    });
  }

}
