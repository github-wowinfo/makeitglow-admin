import { OrderStatusModalComponent } from './../order-status-modal/order-status-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CanceledOrderTableDataSource, CanceledOrderTableItem } from './canceled-order-table-datasource';

@Component({
  selector: 'app-canceled-order-table',
  templateUrl: './canceled-order-table.component.html',
  styleUrls: ['./canceled-order-table.component.scss']
})
export class CanceledOrderTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CanceledOrderTableItem>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  cancelledorderData: any = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['ordrID', 'custId', 'custName', 'total', 'status', 'action'];

  constructor(private apiService: ApiService, private dialog: MatDialog) {
    this.cancelledorder()
  }

  cancelledorder() {
    this.apiService.getcancelledOrders().subscribe(
      (response) => {
        this.cancelledorderData = response
        this.dataSource = new MatTableDataSource<any>(this.cancelledorderData)
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
      this.cancelledorder()
      // Handle any result or action after the modal is closed
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
