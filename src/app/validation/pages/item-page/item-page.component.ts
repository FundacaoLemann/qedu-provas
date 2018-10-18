import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Item } from '../../../shared/model/item';
import { Matrix } from '../../../shared/model/matrix';
import { ValidationStateService } from '../../services/validation-state.service';

@Component({
  selector: 'qp-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.sass'],
})
export class ItemPageComponent implements OnInit {
  title = '';
  matrix = new Matrix();
  currentItem = new Item();
  currentItemIndex = 0;
  answer = 0;
  itemsLength = 1;

  constructor(
    private stateService: ValidationStateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  async ngOnInit() {
    if (!this.stateIsValid()) {
      return this.redirectOnEmptyState();
    }

    const { matrix } = this.stateService.state;
    this.matrix = matrix;
    this.title = matrix.title;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.currentItemIndex = +params.get('itemIndex');
      this.currentItem = matrix.items[this.currentItemIndex - 1];
      this.itemsLength = matrix.items.length;
    });
  }

  stateIsValid = (): boolean => {
    return !!this.stateService.state.matrix;
  }

  redirectOnEmptyState = () => {
    return this.router.navigateByUrl('/validacao');
  }

  handleNextQuestion = () => {
    this.router.navigate(['/validacao', this.matrix.id, 'item', (this.currentItemIndex + 1)]);
  }

  handleOptionClick = () => {
    console.log('clicked');
  }
}
