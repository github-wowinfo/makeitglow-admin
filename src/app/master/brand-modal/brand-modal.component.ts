import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-brand-modal',
  templateUrl: './brand-modal.component.html',
  styleUrls: ['./brand-modal.component.scss']
})
export class BrandModalComponent implements OnInit {
  inputdata: any;
  editData: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<BrandModalComponent>, private builder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.inputdata = this.data
    if (this.inputdata.id > 0) {
      this.setEditData(this.inputdata.id)
    }
  }

  closepopup() {
    this.ref.close()
  }
  myForm = this.builder.group({
    brndName: this.builder.control('')
  })



  setEditData(id: any) {
    this.apiService.getBrandById(id).subscribe(item => {
      this.editData = item;
      this.myForm.setValue(this.editData.brndName)
    })
  }

  SaveBrand() {
    console.log(this.myForm.value);
    this.apiService.createBrand(this.myForm.value).subscribe(res => {
      this.closepopup()
    })
  }
}
