import { Router } from '@angular/router';
import { OrderStatusModalComponent } from './../order-status-modal/order-status-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RefundOrderTableDataSource, RefundOrderTableItem } from './refund-order-table-datasource';

@Component({
  selector: 'app-refund-order-table',
  templateUrl: './refund-order-table.component.html',
  styleUrls: ['./refund-order-table.component.scss']
})
export class RefundOrderTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<RefundOrderTableItem>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  refundedorderData: any = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['ordrID', 'custId', 'custName', 'total', 'status', 'action'];

  constructor(private router: Router, private apiService: ApiService, private dialog: MatDialog) {
    this.refundedorder()
  }

  refundedorder() {
    this.apiService.getrefundedOrders().subscribe(
      (response) => {
        this.refundedorderData = response
        this.dataSource = new MatTableDataSource<any>(this.refundedorderData)
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error creating post:', error);
        // Optionally, you can handle errors, show a message, etc.
      }
    )
  }
  openOrderStatusModal(oid: number, status: number) {
    const dialogRef = this.dialog.open(OrderStatusModalComponent, {
      data: { oid, status },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refundedorder()
      // Handle any result or action after the modal is closed
    });
  }
  redirectToAnotherComponent(id: string): void {
    console.log('clicked');
    this.router.navigate(['/orderDetails', id]);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
