import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CategoryTableDataSource, CategoryTableItem } from './category-table-datasource';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoryTableItem>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  catData: any = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'description', 'tags', 'url', 'type', 'title', 'metadescription', 'action'];

  constructor(private apiService: ApiService, private dialog: MatDialog) {
    this.loadCat()
  }

  loadCat() {
    this.apiService.getCategory().subscribe(
      (response) => {
        this.catData = response
        this.dataSource = new MatTableDataSource<any>(this.catData)
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
