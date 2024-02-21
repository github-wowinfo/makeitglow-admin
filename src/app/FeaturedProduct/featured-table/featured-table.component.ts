import { FeaturedModalComponent } from './../featured-modal/featured-modal.component';
import { DeleteConfirmationComponent } from './../../delete-confirmation/delete-confirmation.component';
import { ToastService } from './../../toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FeaturedTableDataSource, FeaturedTableItem } from './featured-table-datasource';

@Component({
  selector: 'app-featured-table',
  templateUrl: './featured-table.component.html',
  styleUrls: ['./featured-table.component.scss']
})
export class FeaturedTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FeaturedTableItem>;
  featuredproduct: any = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'image', 'name', 'Action'];



  constructor(private apiService: ApiService, private dialog: MatDialog, private toastService: ToastService,) {
    // this.dataSource = new BrandTableDataSource();
    this.loadFeature()
  }


  loadFeature() {
    this.apiService.getFeaturedProduct().subscribe(
      (response) => {
        this.featuredproduct = response
        this.dataSource = new MatTableDataSource<any>(this.featuredproduct)
        this.dataSource.paginator = this.paginator;

      },
      (error) => {
        console.error('Error creating post:', error);
        // Optionally, you can handle errors, show a message, etc.
      }
    )
  }



  addFeaturedProduct() {
    this.Openpopup(0, 'Add Featured Product')
  }

  deleteFeaturedProduct(id: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed deletion
        this.apiService.deleteFeaturedProduct(id).subscribe(response => {
          this.toastService.showSuccess('Blog Category Deleted successfully!');
          this.loadFeature();
          console.log('Delete successful', response);
        });
      }
    });
  }

  Openpopup(id: any, title: any) {
    var _popup = this.dialog.open(FeaturedModalComponent, {
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
