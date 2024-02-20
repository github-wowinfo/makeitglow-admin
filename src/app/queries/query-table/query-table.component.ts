import { ToastService } from './../../toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { QueryTableDataSource, QueryTableItem } from './query-table-datasource';

@Component({
  selector: 'app-query-table',
  templateUrl: './query-table.component.html',
  styleUrls: ['./query-table.component.scss']
})
export class QueryTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<QueryTableItem>;
  // dataSource: QueryTableDataSource;
  queries: any = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'email', 'phone', 'subject', 'message'];

  constructor(private apiService: ApiService, private dialog: MatDialog, private toastService: ToastService,) {
    this.loadQueries()
  }

  loadQueries() {
    this.apiService.getQueries().subscribe(
      (response) => {
        this.queries = response
        this.dataSource = new MatTableDataSource<any>(this.queries)
        this.dataSource.paginator = this.paginator;

      },
      (error) => {
        console.error('Error creating post:', error);
        // Optionally, you can handle errors, show a message, etc.
      }
    )
  }

  ngAfterViewInit(): void {
    // Check if the necessary components are defined before accessing their properties
    if (this.sort && this.paginator && this.table) {
      this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    } else {
      console.error('One or more required components are undefined.');
    }
  }
}
