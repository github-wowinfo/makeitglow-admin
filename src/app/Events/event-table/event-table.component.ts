import { Router } from '@angular/router';
import { EventModalComponent } from './../../master/event-modal/event-modal.component';
import { DeleteConfirmationComponent } from './../../delete-confirmation/delete-confirmation.component';
import { ToastService } from './../../toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EventTableDataSource, EventTableItem } from './event-table-datasource';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.scss']
})
export class EventTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EventTableItem>;
  faqdata: any = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'date', 'Action'];



  constructor(private router: Router, private apiService: ApiService, private dialog: MatDialog, private toastService: ToastService,) {
    // this.dataSource = new BrandTableDataSource();
    this.loadFeature()
  }


  loadFeature() {
    this.apiService.getevent().subscribe(
      (response) => {
        this.faqdata = response
        this.dataSource = new MatTableDataSource<any>(this.faqdata)
        this.dataSource.paginator = this.paginator;

      },
      (error) => {
        console.error('Error creating post:', error);
        // Optionally, you can handle errors, show a message, etc.
      }
    )
  }


  editFaq(id: any) {
    this.Openpopup(id, 'Edit Event')
  }
  addFaq() {
    this.Openpopup(0, 'Add Event')
  }

  deleteFaq(id: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed deletion
        this.apiService.deleteevent(id).subscribe(response => {
          this.toastService.showSuccess('Event Deleted successfully!');
          this.loadFeature();
          console.log('Delete successful', response);
        });
      }
    });
  }

  Openpopup(id: any, title: any) {
    var _popup = this.dialog.open(EventModalComponent, {
      width: '40%',
      data: {
        title: title,
        id: id
      }
    });

    _popup.afterClosed().subscribe(item => {
      this.loadFeature()
    })
  }
  ngOnInit(): void {

  }


  redirectToViewEvent(id: string): void {
    console.log('clicked');
    this.router.navigate(['/viewEvent', id]);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }
}
