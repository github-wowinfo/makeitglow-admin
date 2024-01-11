import { ToastService } from './../../toast.service';
import { LocationModalComponent } from './../location-modal/location-modal.component';
import { DeleteConfirmationComponent } from './../../delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { LocationTableDataSource, LocationTableItem } from './location-table-datasource';

@Component({
  selector: 'app-location-table',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.scss']
})
export class LocationTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<LocationTableItem>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  locationData: any = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['locationName', 'countryName', 'cityName', 'zipCode', 'action'];

  constructor(private apiService: ApiService, private dialog: MatDialog, private toastService: ToastService) {
    this.loadLoaction()
  }

  loadLoaction() {
    this.apiService.getLocation().subscribe(
      (response) => {
        this.locationData = response
        this.dataSource = new MatTableDataSource<any>(this.locationData)
      },
      (error) => {
        console.error('Error creating post:', error);
        // Optionally, you can handle errors, show a message, etc.
      }
    )
  }

  editLocation(id: any) {
    this.Openpopup(id, 'Edit Location')
  }

  addLocation() {
    this.Openpopup(0, 'Add Location')
  }

  deleteLocation(id: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed deletion
        this.apiService.deleteLocation(id).subscribe(response => {
          this.toastService.showSuccess('Location Deleted successfully!');
          this.loadLoaction();
          console.log('Delete successful', response);
        });
      }
    });
  }

  Openpopup(id: any, title: any) {
    var _popup = this.dialog.open(LocationModalComponent, {
      width: '40%',
      data: {
        title: title,
        id: id
      }
    });

    _popup.afterClosed().subscribe(item => {
      this.loadLoaction()
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
