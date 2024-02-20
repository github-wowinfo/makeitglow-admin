import { ToastService } from './../../toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from './../../api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SubscriptionTableDataSource, SubscriptionTableItem } from './subscription-table-datasource';

@Component({
  selector: 'app-subscription-table',
  templateUrl: './subscription-table.component.html',
  styleUrls: ['./subscription-table.component.scss']
})
export class SubscriptionTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<SubscriptionTableItem>;
  queries: any = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['srno', 'email'];

  constructor(private apiService: ApiService, private dialog: MatDialog, private toastService: ToastService,) {
    this.loadQueries()
  }

  loadQueries() {
    this.apiService.getSubscription().subscribe(
      (response) => {
        this.queries = response.map((item, index) => ({ ...item, srno: index + 1 }));
        this.dataSource = new MatTableDataSource<any>(this.queries);
        this.dataSource.paginator = this.paginator;

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
