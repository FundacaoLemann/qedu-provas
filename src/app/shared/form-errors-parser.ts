import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

export class FormErrorsParser {
  static parseField(formField: AbstractControl): string[] {
    const errorMessages: string[] = [];
    const errors = formField.errors;

    if ( errors == null ) {
      return errorMessages;
    }

    if ( errors.hasOwnProperty('required') ) {
      errorMessages.push('Campo obrigatório');
    }

    if ( errors.hasOwnProperty('minlength') ) {
      errorMessages.push(`Campo deve ter pelo menos ${errors['minlength'].requiredLength} caracteres`);
    }

    if ( errors.hasOwnProperty('maxlength') ) {
      errorMessages.push(`Campo não deve ter mais que ${errors['maxlength'].requiredLength} caracteres`);
    }

    if ( errors.hasOwnProperty('pattern') ) {
      errorMessages.push(`Formato inválido`);
    }

    if ( errors.hasOwnProperty('forbiddenCharacters') ) {
      errorMessages.push(`Caracteres inválidos: ${errors['forbiddenCharacters'].join('')}`);
    }

    return errorMessages;
  }

  static parseForm(form: FormGroup, dirtyFieldsOnly = true): any {
    const errorMessages = {};

    for (const controlName in form.controls) {
      if ( controlName ) {
        const control: AbstractControl = form.controls[controlName];

        if ( dirtyFieldsOnly && !control.dirty ) {
          break;
        }

        const errors: string[] = FormErrorsParser.parseField(control);

        errorMessages[controlName] = (errors) ? errors : [];
      }
    }

    return (errorMessages);
  }

}
