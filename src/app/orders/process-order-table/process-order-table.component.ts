import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ProcessOrderTableDataSource, ProcessOrderTableItem } from './process-order-table-datasource';

@Component({
  selector: 'app-process-order-table',
  templateUrl: './process-order-table.component.html',
  styleUrls: ['./process-order-table.component.scss']
})
export class ProcessOrderTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProcessOrderTableItem>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  newprocessData: any = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['ordrID', 'custId', 'custName', 'total', 'status', 'action'];

  constructor(private apiService: ApiService, private dialog: MatDialog) {
    this.processorder()
  }

  processorder() {
    this.apiService.getprocessOrders().subscribe(
      (response) => {
        this.newprocessData = response
        this.dataSource = new MatTableDataSource<any>(this.newprocessData)
      },
      (error) => {
        console.error('Error creating post:', error);
        // Optionally, you can handle errors, show a message, etc.
      }
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
