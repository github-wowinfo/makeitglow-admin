import { ApiService } from 'src/app/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'; // Import MatPaginator
import { NewOrderTableDataSource, NewOrderTableItem } from './new-order-table-datasource';

@Component({
  selector: 'app-new-order-table',
  templateUrl: './new-order-table.component.html',
  styleUrls: ['./new-order-table.component.scss']
})
export class NewOrderTableComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<NewOrderTableItem>;
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Add this line for pagination
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  neworderData: any = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['ordrID', 'custId', 'custName', 'total', 'status', 'action'];

  constructor(private apiService: ApiService, private dialog: MatDialog) {
    this.neworder();
  }

  neworder() {
    this.apiService.getNewOrders().subscribe(
      (response) => {
        this.neworderData = response;
        this.dataSource = new MatTableDataSource<any>(this.neworderData);
        this.dataSource.paginator = this.paginator; // Set paginator after receiving data
      },
      (error) => {
        console.error('Error creating post:', error);
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }
}
