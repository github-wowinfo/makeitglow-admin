import { MatDialog } from '@angular/material/dialog';
import { ToastService } from './../../toast.service';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  id: string;
  blog: any = [];
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Retrieve the 'id' parameter from the URL
      this.id = params.get('id');
      console.log(this.id);
      this.blogDetails(this.id)
    })
  }
  constructor(private route: ActivatedRoute, private apiService: ApiService, private toastService: ToastService, private dialog: MatDialog) { }


  blogDetails(id) {
    this.apiService.getblogById(id).subscribe(
      (response) => {
        this.blog = response
        console.log(response);

      },
      (error) => {
        console.error('Error creating post:', error);
        // Optionally, you can handle errors, show a message, etc.
      }
    )
  }
}
