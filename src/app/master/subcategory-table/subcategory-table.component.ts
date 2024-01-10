import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SubcategoryTableDataSource, SubcategoryTableItem } from './subcategory-table-datasource';

@Component({
  selector: 'app-subcategory-table',
  templateUrl: './subcategory-table.component.html',
  styleUrls: ['./subcategory-table.component.scss']
})
export class SubcategoryTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<SubcategoryTableItem>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  subcatData: any = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['subcatname', 'catname', 'tags', 'url', 'type', 'title', 'metadescription', 'action'];

  constructor(private apiService: ApiService, private dialog: MatDialog) {
    this.loadSubCat()
  }


  loadSubCat() {
    this.apiService.getsubCategory().subscribe(
      (response) => {
        this.subcatData = response
        this.dataSource = new MatTableDataSource<any>(this.subcatData)
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
