import { BlogModalComponent } from './../blog-modal/blog-modal.component';
import { BlogTagModalComponent } from './../blog-tag-modal/blog-tag-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { BlogCatModalComponent } from './../blog-cat-modal/blog-cat-modal.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-data',
  templateUrl: './blog-data.component.html',
  styleUrls: ['./blog-data.component.scss']
})
export class BlogDataComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  OpenBlogCat() {
    var _popup = this.dialog.open(BlogCatModalComponent, {
      width: '40%',
    });
  }
  OpenBlogTag() {
    var _popup = this.dialog.open(BlogTagModalComponent, {
      width: '40%',
    });
  }
  OpenBlog() {
    var _popup = this.dialog.open(BlogModalComponent, {
      width: '40%',
    });
  }

}
