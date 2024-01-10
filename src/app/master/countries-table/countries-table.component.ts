import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CountriesModalComponent } from '../countries-modal/countries-modal.component';
import { CountriesTableDataSource, CountriesTableItem } from './countries-table-datasource';

@Component({
  selector: 'app-countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: ['./countries-table.component.scss']
})
export class CountriesTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CountriesTableItem>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  countryData: any = [];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'phoneCode', 'action'];

  constructor(private apiService: ApiService, private dialog: MatDialog) {
    // this.dataSource = new CountriesTableDataSource();
    this.loadCountry()
  }

  loadCountry() {
    this.apiService.getCountry().subscribe(
      (response) => {
        this.countryData = response
        this.dataSource = new MatTableDataSource<any>(this.countryData)
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

// getCountry
