/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ForbiddenCharactersDirective } from './forbidden-characters.directive';

import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { forbiddenCharactersValidator } from '../shared';

import { Student } from '../model/student';
import { CustomFormErrors } from '../shared';

let fc: FormControl;

describe('Directive: ForbiddenCharacters', () => {

  it('should create an instance', () => {
    let directive = new ForbiddenCharactersDirective();
    expect(directive).toBeTruthy();
  });

});
