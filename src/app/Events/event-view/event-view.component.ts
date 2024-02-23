import { environment } from './../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from './../../toast.service';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {
  apiUrl = environment.apiUrl;
  id: string;
  event: any = [];
  // dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private toastService: ToastService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Retrieve the 'id' parameter from the URL
      this.id = params.get('id');
      console.log(this.id);
      this.loadevent(this.id)
    })
    console.log('apiUrl', this.apiUrl);

  }


  // displayedColumns = ['vrntEntryId', 'itemTitle', 'barCodeNo', 'availableStock', 'action', 'action1'];

  loadevent(id) {
    this.apiService.geteventById(id).subscribe(
      (response) => {
        this.event = response
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
}
