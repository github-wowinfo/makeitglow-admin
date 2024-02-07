import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DeletedOrderTableDataSource, DeletedOrderTableItem } from './deleted-order-table-datasource';

@Component({
  selector: 'app-deleted-order-table',
  templateUrl: './deleted-order-table.component.html',
  styleUrls: ['./deleted-order-table.component.scss']
})
export class DeletedOrderTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DeletedOrderTableItem>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  deletedorderData: any = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['srno', 'ordrID', 'custId', 'custName', 'total', 'status'];

  constructor(private router: Router, private apiService: ApiService, private dialog: MatDialog) {
    this.deletedorder()
  }

  deletedorder() {
    this.apiService.getdeletedOrders().subscribe(
      (response) => {
        this.deletedorderData = response
        this.dataSource = new MatTableDataSource<any>(this.deletedorderData)
      },
      (error) => {
        console.error('Error creating post:', error);
        // Optionally, you can handle errors, show a message, etc.
      }
    )
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
