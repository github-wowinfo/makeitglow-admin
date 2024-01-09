import { BrandModalComponent } from './../brand-modal/brand-modal.component';
import { ApiService } from './../../api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BrandTableDataSource, BrandTableItem } from './brand-table-datasource';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-brand-table',
  templateUrl: './brand-table.component.html',
  styleUrls: ['./brand-table.component.scss']
})
export class BrandTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<BrandTableItem>;

  brand: any = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'Action'];



  constructor(private apiService: ApiService, private dialog: MatDialog) {
    // this.dataSource = new BrandTableDataSource();
  }

  editCustomer(id: any) {
    console.log(id);
    this.Openpopup(id, 'Edit Brand')
  }

  addCustomer() {
    this.Openpopup(0, 'Add Brand')
  }

  Openpopup(id: any, title: any) {
    var _popup = this.dialog.open(BrandModalComponent, {
      width: '40%',
      data: {
        title: title,
        id: id
      }
    });
  }
  ngOnInit(): void {
    this.apiService.getPosts().subscribe(
      (response) => {
        this.brand = response
        this.dataSource = new MatTableDataSource<any>(this.brand)
        console.log('Post created successfully:', response);
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
