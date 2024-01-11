import { ToastService } from './../../toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CustomerTableDataSource, CustomerTableItem } from './customer-table-datasource';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CustomerTableItem>;
  customer: any = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['userId', 'email', 'phoneNumber', 'name', 'location', 'reference', 'address', 'action'];

  constructor(private apiService: ApiService, private dialog: MatDialog, private toastService: ToastService,) {
    this.loadCustomers()
  }

  loadCustomers() {
    this.apiService.getCustomers().subscribe(
      (response) => {
        this.customer = response
        this.dataSource = new MatTableDataSource<any>(this.customer)
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
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    } else {
      console.error('One or more required components are undefined.');
    }
  }
}
