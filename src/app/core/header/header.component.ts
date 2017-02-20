import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../shared/model/student';
import { ApplymentService } from '../../applyment/shared/applyment.service';

@Component({
  selector: 'qp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  @Input('logo') logo = true;

  student: Student;

  constructor (private applymentService: ApplymentService) {
  }

  ngOnInit () {
    this.student = this.applymentService.getStudent();
  }

}
