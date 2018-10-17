import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Item } from '../../../shared/model/item';
import { ValidationStateService } from '../../services/validation-state.service';

@Component({
  selector: 'qp-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.sass'],
})
export class ItemPageComponent implements OnInit {
  title = '';
  questionIndex = 0;
  question = new Item();
  answer = 0;

  constructor(private stateService: ValidationStateService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const { state } = this.stateService;

    this.title = state.matrix.title;
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.questionIndex = +params.get('itemIndex') - 1;
        this.question = state.matrix.items[this.questionIndex];
      },
    );
  }

  handleOptionClick = () => {
    console.log('clicked');
  }

}
