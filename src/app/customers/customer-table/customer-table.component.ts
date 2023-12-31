import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
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
  dataSource: CustomerTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['SrNo', 'CustomerInfo', 'CompanyInfo', 'Reference', 'ContactNo'];

  constructor() {
    this.dataSource = new CustomerTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  // ngAfterViewInit(): void {
  //   // Check if the necessary components are defined before accessing their properties
  //   if (this.sort && this.paginator && this.table) {
  //     this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;
  //     this.table.dataSource = this.dataSource;
  //   } else {
  //     console.error('One or more required components are undefined.');
  //   }
  // }
}
