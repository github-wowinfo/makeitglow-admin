import { TopCategoryModalComponent } from '../top-category-modal/top-category-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ecomm-sequence',
  templateUrl: './ecomm-sequence.component.html',
  styleUrls: ['./ecomm-sequence.component.scss']
})
export class EcommSequenceComponent implements OnInit {

  lessons = []

  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.lessons, event.previousIndex, event.currentIndex)
  }

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  OpenCategory() {
    var _popup = this.dialog.open(TopCategoryModalComponent, {
      width: '40%',
    });
  }
}
