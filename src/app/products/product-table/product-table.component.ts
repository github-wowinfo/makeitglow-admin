import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from './../../delete-confirmation/delete-confirmation.component';
import { ToastService } from './../../toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ProductTableDataSource, ProductTableItem } from './product-table-datasource';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProductTableItem>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  product: any = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */


  displayedColumns = ['ItemEntryId', 'itemName', 'shortDescription', 'hasVariant', 'action'];

  constructor(private router: Router, private apiService: ApiService, private dialog: MatDialog, private toastService: ToastService) {
    this.loadProduct()
  }


  loadProduct() {
    this.apiService.getProducts().subscribe(
      (response) => {
        this.product = response
        this.dataSource = new MatTableDataSource<any>(this.product)
      },
      (error) => {
        console.error('Error creating post:', error);
        // Optionally, you can handle errors, show a message, etc.
      }
    )
  }
  onSlideToggleChange(id: any, currentVariant: any) {
    const newVariant = !currentVariant; // Flip the value
    this.setVariant(id, newVariant);
  }

  setVariant(id: any, variant: any) {
    this.apiService.EnableDisableHasVariant(id, variant).subscribe(response => {
      this.toastService.showSuccess('Variant Updated successfully!');
      this.loadProduct();
      console.log('variant', response);
    },
      (error) => {
        console.error('Error creating post:', error);
        this.toastService.showError(error.message)
        // Optionally, you can handle errors, show a message, etc.
      }
    );
  }

  deleteProduct(id: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed deletion
        this.apiService.deleteProduct(id).subscribe(response => {
          this.toastService.showSuccess('Brand Deleted successfully!');
          this.loadProduct();
          console.log('Delete successful', response);
        });
      }
    });
  }


  redirectToAnotherComponent(id: string): void {
    console.log('clicked');
    this.router.navigate(['/viewProduct', id]);
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
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    } else {
      console.error('One or more required components are undefined.');
    }
  }
}
