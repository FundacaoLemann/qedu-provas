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
  currentItemIndex = 1;
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

    this.bindData();
  }

  handleNextQuestionClick = () => {
    const nextItemIndex = this.currentItemIndex + 1;
    if (nextItemIndex <= this.itemsLength) {
      this.nagivateToItem(nextItemIndex);
    }
    if (this.currentItemIndex === this.itemsLength) {
      this.router.navigate(['/validacao', this.matrix.id, 'aprovacao']);
    }
  };

  handlePrevQuestionClick = () => {
    const prevItemIndex = this.currentItemIndex - 1;
    if (prevItemIndex >= 1) {
      this.nagivateToItem(prevItemIndex);
    }
  };

  handleOptionClick = () => {};

  private stateIsValid = (): boolean => {
    return !!this.stateService.state.matrix;
  };

  private handleParamChangePart = (matrix: Matrix) => {
    return (params: ParamMap) => {
      this.currentItemIndex = +params.get('itemIndex');
      this.currentItem = matrix.items[this.currentItemIndex - 1];
      this.itemsLength = matrix.items.length;
    };
  };

  private bindData = () => {
    const { matrix } = this.stateService.state;
    this.matrix = matrix;
    this.title = matrix.title;
    this.route.paramMap.subscribe(this.handleParamChangePart(matrix));
  };

  private redirectOnEmptyState = () => {
    return this.router.navigateByUrl('/validacao');
  };

  private resetScroll = () => {
    window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  };

  private nagivateToItem = (itemIndex: number) => {
    this.resetScroll();
    this.router.navigate(['/validacao', this.matrix.id, 'item', itemIndex]);
  };
}
