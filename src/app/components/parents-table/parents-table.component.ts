import { Component, OnInit } from '@angular/core';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-parents-table',
  templateUrl: './parents-table.component.html',
  styleUrls: ['./parents-table.component.css']
})
export class ParentsTableComponent implements OnInit {
   parentList :[] =[]
  constructor(private parentService:ParentService) { }

  ngOnInit() {
    this.getAllParents()
  }

  getAllParents()
  {
    this.parentService.getAllParents().subscribe(res => {
      this.parentList = res.parentsTab
    } , error => {
          console.error(error)
    } , () => {

    })
  }


}
