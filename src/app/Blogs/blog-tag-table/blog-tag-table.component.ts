import { BlogTagModalComponent } from './../blog-tag-modal/blog-tag-modal.component';
import { DeleteConfirmationComponent } from './../../delete-confirmation/delete-confirmation.component';
import { ToastService } from './../../toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BlogTagTableDataSource, BlogTagTableItem } from './blog-tag-table-datasource';

@Component({
  selector: 'app-blog-tag-table',
  templateUrl: './blog-tag-table.component.html',
  styleUrls: ['./blog-tag-table.component.scss']
})
export class BlogTagTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<BlogTagTableItem>;
  blogCat: any = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'Action'];



  constructor(private apiService: ApiService, private dialog: MatDialog, private toastService: ToastService,) {
    // this.dataSource = new BrandTableDataSource();
    this.loadTag()
  }


  loadTag() {
    this.apiService.getblogTag().subscribe(
      (response) => {
        this.blogCat = response
        this.dataSource = new MatTableDataSource<any>(this.blogCat)
        this.dataSource.paginator = this.paginator;

      },
      (error) => {
        console.error('Error creating post:', error);
        // Optionally, you can handle errors, show a message, etc.
      }
    )
  }

  editTag(id: any) {
    this.Openpopup(id, 'Edit Blog Tag')
  }

  addTag() {
    this.Openpopup(0, 'Add Blog Tag')
  }

  deleteTag(id: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed deletion
        this.apiService.deleteblogTag(id).subscribe(response => {
          this.toastService.showSuccess('Blog Tag Deleted successfully!');
          this.loadTag();
          console.log('Delete successful', response);
        });
      }
    });
  }

  Openpopup(id: any, title: any) {
    var _popup = this.dialog.open(BlogTagModalComponent, {
      width: '40%',
      data: {
        title: title,
        id: id
      }
    });

    _popup.afterClosed().subscribe(item => {
      this.loadTag()
    })
  }
  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }
}
