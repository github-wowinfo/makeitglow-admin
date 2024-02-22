import { ToastService } from './../../toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gift-view',
  templateUrl: './gift-view.component.html',
  styleUrls: ['./gift-view.component.scss']
})
export class GiftViewComponent implements OnInit {
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


  displayedColumns = ['vrntEntryId', 'itemTitle', 'barCodeNo', 'availableStock', 'action', 'action1'];

  loadProduct(id) {
    this.apiService.getGiftById(id).subscribe(
      (response) => {
        this.product = response
        console.log(response);
        // this.dataSource = new MatTableDataSource<any>(this.product.vrnts)
        // this.dataSource.paginator = this.paginator;


      },
      (error) => {
        console.error('Error creating post:', error);
        // Optionally, you can handle errors, show a message, etc.
      }
    )
  }


  // deleteProductVariant(id: any) {
  //   const dialogRef = this.dialog.open(DeleteConfirmationComponent);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       // User confirmed deletion
  //       this.apiService.deleteProductVariant(id).subscribe(response => {
  //         this.toastService.showSuccess('Variant Deleted successfully!');
  //         // this.loadProduct(id);
  //         location.reload()
  //         console.log('Delete successful', response);
  //       });
  //     }
  //   });
  // }

  // redirectToAnotherComponent(id: string): void {
  //   // /products/addProduct/0
  //   this.router.navigate([`/products/addVariant/${id}/0`]);
  // }
  // navigateToAddOrUpdateProduct(id: string, variantId: string): void {
  //   // /products/addProduct/0
  //   this.router.navigate([`/products/addVariant/${id}/${variantId}`]);
  // }
  // redirectToStock(id: string): void {
  //   this.router.navigate(['/Inventory', id]);
  // }
  // redirectToVariantView(id: string): void {
  //   this.router.navigate(['/ViewInventory', id]);
  // }

  // ngAfterViewInit(): void {
  //   // Check if the necessary components are defined before accessing their properties
  //   if (this.sort && this.paginator && this.table) {
  //     this.dataSource.sort = this.sort;
  //     this.table.dataSource = this.dataSource;
  //   } else {
  //     console.error('One or more required components are undefined.');
  //   }
  // }

}
