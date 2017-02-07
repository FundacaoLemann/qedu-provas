import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[qpForbiddenCharacters]'
})
export class ForbiddenCharactersDirective {

  constructor() {
  }

}

export function forbiddenCharactersValidator(charactersList: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let invalidCharactersMatch: string[] | null;
    invalidCharactersMatch = control.value.match(charactersList);

    if ( invalidCharactersMatch instanceof Array ) {
      const uniqueInvalidCharactersMatch: string[] = [];

      invalidCharactersMatch.map((value) => {
        if ( uniqueInvalidCharactersMatch.indexOf(value) === -1 ) {
          uniqueInvalidCharactersMatch.push(value);
        }
      });
      return { 'forbiddenCharacters': uniqueInvalidCharactersMatch };
    }
    return null;
  };
}
