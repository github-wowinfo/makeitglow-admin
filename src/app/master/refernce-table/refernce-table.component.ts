import { RefernceModalComponent } from './../refernce-modal/refernce-modal.component';
import { DeleteConfirmationComponent } from './../../delete-confirmation/delete-confirmation.component';
import { ToastService } from './../../toast.service';
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

  constructor(private apiService: ApiService, private dialog: MatDialog, private toastService: ToastService,) {
    this.loadReference()
  }

  loadReference() {
    this.apiService.getReference().subscribe(
      (response) => {
        this.refernceData = response
        this.dataSource = new MatTableDataSource<any>(this.refernceData)
        this.dataSource.paginator = this.paginator;

      },
      (error) => {
        console.error('Error creating post:', error);
        // Optionally, you can handle errors, show a message, etc.
      }
    )
  }

  editReference(id: any) {
    this.Openpopup(id, 'Edit Reference')
  }

  addReference() {
    this.Openpopup(0, 'Add Reference')
  }

  Openpopup(id: any, title: any) {
    var _popup = this.dialog.open(RefernceModalComponent, {
      width: '40%',
      data: {
        title: title,
        id: id
      }
    });

    _popup.afterClosed().subscribe(item => {
      this.loadReference()
    })
  }


  deleteReference(id: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed deletion
        this.apiService.deleteReference(id).subscribe(response => {
          this.toastService.showSuccess('Reference Deleted successfully!');
          this.loadReference();
          console.log('Delete successful', response);
        },
          (error) => {
            console.error('Error creating post:', error);
            this.toastService.showError(error);
            // Optionally, you can handle errors, show a message, etc.
          }
        );
      }
    });
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
      this.table.dataSource = this.dataSource;
    } else {
      console.error('One or more required components are undefined.');
    }
  }
}
