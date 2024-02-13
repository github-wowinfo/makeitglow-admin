import { MatDialog } from '@angular/material/dialog';
import { ToastService } from './../../toast.service';
import { DeleteConfirmationComponent } from './../../delete-confirmation/delete-confirmation.component';

import { ApiService } from 'src/app/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewProductComponent>;
  id: string;
  product: any = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private toastService: ToastService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Retrieve the 'id' parameter from the URL
      this.id = params.get('id');
      console.log(this.id);
      this.loadProduct(this.id)
    })
  }


  displayedColumns = ['vrntEntryId', 'itemTitle', 'barCodeNo', 'isAvailabile', 'isBuyable', 'availableStock', 'action'];

  loadProduct(id) {
    this.apiService.getProductById(id).subscribe(
      (response) => {
        this.product = response
        console.log(response);
        this.dataSource = new MatTableDataSource<any>(this.product.vrnts)

      },
      (error) => {
        console.error('Error creating post:', error);
        // Optionally, you can handle errors, show a message, etc.
      }
    )
  }


  deleteProductVariant(id: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed deletion
        this.apiService.deleteProductVariant(id).subscribe(response => {
          this.toastService.showSuccess('Variant Deleted successfully!');
          this.loadProduct(id);
          console.log('Delete successful', response);
        });
      }
    });
  }

  redirectToAnotherComponent(id: string): void {
    console.log('clicked');
    this.router.navigate(['/products/addVariant', id]);
  }

  ngAfterViewInit(): void {
    // Check if the necessary components are defined before accessing their properties
    if (this.sort && this.paginator && this.table) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    } else {
      console.error('One or more required components are undefined.');
    }
  }
}
