import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

export class FormErrorsParser {
  static parseField(formField: AbstractControl): string[] {
    let errorMessages: string[] = [];
    let errors = formField.errors;

    if(errors == null ) return errorMessages;

    if(errors.hasOwnProperty('required')) {
      errorMessages.push('Campo obrigatório');
    }

    if(errors.hasOwnProperty('minlength')) {
      errorMessages.push(`Campo deve ter pelo menos ${errors['minlength'].requiredLength} caracteres`);
    }

    if(errors.hasOwnProperty('maxlength')) {
      errorMessages.push(`Campo não deve ter mais que ${errors['maxlength'].requiredLength} caracteres`);
    }

    if(errors.hasOwnProperty('pattern')) {
      errorMessages.push(`Formato inválido`);
    }

    if(errors.hasOwnProperty('forbiddenCharacters')) {
      errorMessages.push(`Caracteres inválidos: ${errors['forbiddenCharacters'].join('')}`);
    }

    return errorMessages;
  }

  static parseForm(form: FormGroup, dirtyFieldsOnly: boolean = true): any {
    let errorMessages = {};

    for(let controlName in form.controls) {
      let control: AbstractControl = form.controls[controlName];

      if(dirtyFieldsOnly && ! control.dirty) { break; }

      let errors: string[] = FormErrorsParser.parseField(control);

      errorMessages[controlName] = (errors) ? errors : [];
    }

    return (errorMessages);
  }

}
