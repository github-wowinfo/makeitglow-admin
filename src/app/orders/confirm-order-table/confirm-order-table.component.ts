import { Router } from '@angular/router';
import { OrderStatusModalComponent } from './../order-status-modal/order-status-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ConfirmOrderTableDataSource, ConfirmOrderTableItem } from './confirm-order-table-datasource';

@Component({
  selector: 'app-confirm-order-table',
  templateUrl: './confirm-order-table.component.html',
  styleUrls: ['./confirm-order-table.component.scss']
})
export class ConfirmOrderTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ConfirmOrderTableItem>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  confirmorderData: any = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['srno', 'ordrID', 'custId', 'custName', 'total', 'status', 'action'];

  constructor(private router: Router, private apiService: ApiService, private dialog: MatDialog) {
    this.confirmorder()
  }

  confirmorder() {
    this.apiService.getConfirmedOrders().subscribe(
      (response) => {
        this.confirmorderData = response
        this.dataSource = new MatTableDataSource<any>(this.confirmorderData)
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
      this.confirmorder()
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
    this.table.dataSource = this.dataSource;
  }
}
