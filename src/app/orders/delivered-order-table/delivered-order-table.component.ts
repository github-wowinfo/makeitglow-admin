import { Router } from '@angular/router';
import { OrderStatusModalComponent } from './../order-status-modal/order-status-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DeliveredOrderTableDataSource, DeliveredOrderTableItem } from './delivered-order-table-datasource';

@Component({
  selector: 'app-delivered-order-table',
  templateUrl: './delivered-order-table.component.html',
  styleUrls: ['./delivered-order-table.component.scss']
})
export class DeliveredOrderTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DeliveredOrderTableItem>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  deliveredorderData: any = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['srno', 'ordrID', 'custId', 'custName', 'total', 'status', 'action'];

  constructor(private router: Router, private apiService: ApiService, private dialog: MatDialog) {
    this.deliveredorder()
  }

  deliveredorder() {
    this.apiService.getdeliveredOrders().subscribe(
      (response) => {
        this.deliveredorderData = response
        this.dataSource = new MatTableDataSource<any>(this.deliveredorderData)
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
      this.deliveredorder()
      console.log('The dialog was closed');
      // Handle any result or action after the modal is closed
    });
  }
  redirectToAnotherComponent(id: string): void {
    console.log('clicked');
    this.router.navigate(['/orderDetails', id]);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
