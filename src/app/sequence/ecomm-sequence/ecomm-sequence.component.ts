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

  constructor() { }

  ngOnInit(): void {
  }

}
