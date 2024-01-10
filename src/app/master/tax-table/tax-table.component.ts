import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TaxTableDataSource, TaxTableItem } from './tax-table-datasource';

@Component({
  selector: 'app-tax-table',
  templateUrl: './tax-table.component.html',
  styleUrls: ['./tax-table.component.scss']
})
export class TaxTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TaxTableItem>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  refernceData: any = [];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'action'];

  constructor(private apiService: ApiService, private dialog: MatDialog) {
    this.loadTax()
  }

  loadTax() {
    this.apiService.getTax().subscribe(
      (response) => {
        this.refernceData = response
        this.dataSource = new MatTableDataSource<any>(this.refernceData)
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
