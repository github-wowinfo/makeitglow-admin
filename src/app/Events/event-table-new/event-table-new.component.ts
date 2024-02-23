import { EventMediaModalComponent } from './../event-media-modal/event-media-modal.component';
import { Router } from '@angular/router';
import { ToastService } from './../../toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { DeleteConfirmationComponent } from './../../delete-confirmation/delete-confirmation.component';
import { EventModalNewComponent } from './../event-modal-new/event-modal-new.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EventTableNewDataSource, EventTableNewItem } from './event-table-new-datasource';

@Component({
  selector: 'app-event-table-new',
  templateUrl: './event-table-new.component.html',
  styleUrls: ['./event-table-new.component.scss']
})
export class EventTableNewComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EventTableNewItem>;
  faqdata: any = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'date', 'Action', 'action1'];



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


  editEvent(id: any) {
    this.Openpopup(id, 'Edit Event')
  }
  addEvent() {
    this.Openpopup(0, 'Add Event')
  }
  addImages(id: any) {
    this.OpenMediaModal(id)
  }
  deleteEvent(id: any) {
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
    var _popup = this.dialog.open(EventModalNewComponent, {
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
  OpenMediaModal(id: any) {
    var _popup = this.dialog.open(EventMediaModalComponent, {
      width: '40%',
      data: {
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
