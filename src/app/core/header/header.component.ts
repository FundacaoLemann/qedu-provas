import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../shared/model/student';
import { StoreService } from '../shared/store.service';

@Component({
  selector: 'qp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  @Input('logo') logo = true;

  student: Student;

  constructor (private store: StoreService) {
  }

  ngOnInit () {
    this.student = this.store.getStudent();
  }

}
