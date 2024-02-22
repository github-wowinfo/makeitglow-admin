import { FaqModalNewComponent } from './../faq-modal-new/faq-modal-new.component';
import { FaqModalComponent } from './../../master/faq-modal/faq-modal.component';
import { DeleteConfirmationComponent } from './../../delete-confirmation/delete-confirmation.component';
import { ToastService } from './../../toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FaqNewTableDataSource, FaqNewTableItem } from './faq-new-table-datasource';

@Component({
  selector: 'app-faq-new-table',
  templateUrl: './faq-new-table.component.html',
  styleUrls: ['./faq-new-table.component.scss']
})
export class FaqNewTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FaqNewTableItem>;
  faqdata: any = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'description', 'Action'];



  constructor(private apiService: ApiService, private dialog: MatDialog, private toastService: ToastService,) {
    // this.dataSource = new BrandTableDataSource();
    this.loadFeature()
  }


  loadFeature() {
    this.apiService.getfaq().subscribe(
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
    this.Openpopup(id, 'Edit Faq')
  }
  addFaq() {
    this.Openpopup(0, 'Add Faq')
  }

  deleteFaq(id: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed deletion
        this.apiService.deletefaq(id).subscribe(response => {
          this.toastService.showSuccess('Faq Deleted successfully!');
          this.loadFeature();
          console.log('Delete successful', response);
        });
      }
    });
  }

  Openpopup(id: any, title: any) {
    var _popup = this.dialog.open(FaqModalNewComponent, {
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


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }
}