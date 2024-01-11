import { CityModalComponent } from './../city-modal/city-modal.component';
import { ToastService } from './../../toast.service';
import { DeleteConfirmationComponent } from './../../delete-confirmation/delete-confirmation.component';
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

  constructor(private apiService: ApiService, private dialog: MatDialog, private toastService: ToastService) {
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

  editCity(id: any) {
    this.Openpopup(id, 'Edit City')
  }

  addCity() {
    this.Openpopup(0, 'Add City')
  }

  deleteCity(id: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed deletion
        this.apiService.deleteCity(id).subscribe(response => {
          this.toastService.showSuccess('City Deleted successfully!');
          this.loadCity();
          console.log('Delete successful', response);
        });
      }
    });
  }

  Openpopup(id: any, title: any) {
    var _popup = this.dialog.open(CityModalComponent, {
      width: '40%',
      data: {
        title: title,
        id: id
      }
    });

    _popup.afterClosed().subscribe(item => {
      this.loadCity()
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
