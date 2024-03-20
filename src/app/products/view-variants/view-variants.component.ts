import { MatDialog } from '@angular/material/dialog';
import { ToastService } from './../../toast.service';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-variants',
  templateUrl: './view-variants.component.html',
  styleUrls: ['./view-variants.component.scss']
})
export class ViewVariantsComponent implements OnInit {
  id: string;
  variant: any = [];
  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private toastService: ToastService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Retrieve the 'id' parameter from the URL
      this.id = params.get('id');
      console.log(this.id);
      this.loadVariant(this.id)
    })
  }

  loadVariant(id) {
    this.apiService.getVariantProductById(id).subscribe(
      (response) => {
        this.variant = response
        console.log('dataaaaas',response);
        // this.dataSource = new MatTableDataSource<any>(this.product.vrnts)

      },
      (error) => {
        console.error('Error creating post:', error);
        // Optionally, you can handle errors, show a message, etc.
      }
    )
  }

}
