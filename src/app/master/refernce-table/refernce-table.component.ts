import { ApiService } from 'src/app/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RefernceTableDataSource, RefernceTableItem } from './refernce-table-datasource';

@Component({
  selector: 'app-refernce-table',
  templateUrl: './refernce-table.component.html',
  styleUrls: ['./refernce-table.component.scss']
})
export class RefernceTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<RefernceTableItem>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  refernceData: any = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'action'];

  constructor(private apiService: ApiService, private dialog: MatDialog) {
    this.loadReference()
  }

  loadReference() {
    this.apiService.getReference().subscribe(
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



  // ngAfterViewInit(): void {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  //   this.table.dataSource = this.dataSource;
  // }
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
