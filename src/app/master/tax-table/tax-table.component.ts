import { TaxModalComponent } from './../tax-modal/tax-modal.component';
import { ToastService } from './../../toast.service';
import { DeleteConfirmationComponent } from './../../delete-confirmation/delete-confirmation.component';
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

  constructor(private apiService: ApiService, private dialog: MatDialog, private toastService: ToastService,) {
    this.loadTax()
  }

  loadTax() {
    this.apiService.getTax().subscribe(
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

  editRate(id: any) {
    this.Openpopup(id, 'Edit Tax Rate')
  }

  addRate() {
    this.Openpopup(0, 'Add Tax Rate')
  }

  deleteRate(id: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed deletion
        this.apiService.deleteTax(id).subscribe(response => {
          this.toastService.showSuccess('Tax Rate Deleted successfully!');
          this.loadTax();
          console.log('Delete successful', response);
        });
      }
    });
  }

  Openpopup(id: any, title: any) {
    var _popup = this.dialog.open(TaxModalComponent, {
      width: '40%',
      data: {
        title: title,
        id: id
      }
    });

    _popup.afterClosed().subscribe(item => {
      this.loadTax()
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }
}
