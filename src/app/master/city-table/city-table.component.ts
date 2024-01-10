import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CityTableDataSource, CityTableItem } from './city-table-datasource';

@Component({
  selector: 'app-city-table',
  templateUrl: './city-table.component.html',
  styleUrls: ['./city-table.component.scss']
})
export class CityTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CityTableItem>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  cityData: any = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['cityName', 'countryName', 'phoneCode', 'action'];

  constructor(private apiService: ApiService, private dialog: MatDialog) {
    this.loadCity()
  }

  loadCity() {
    this.apiService.getCity().subscribe(
      (response) => {
        this.cityData = response
        this.dataSource = new MatTableDataSource<any>(this.cityData)
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
