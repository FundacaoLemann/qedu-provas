import { FormControl, Validators } from '@angular/forms';

import { FormErrorsParser } from "./form-errors-parser";
import { forbiddenCharactersValidator } from "./directives/forbidden-characters.directive";

let fc: FormControl;

describe('Class: FormErrorsParser', () => {

  describe('parseField()', () => {
    it('should return an empty array', () => {
      fc = new FormControl('renan', Validators.required);
      expect(FormErrorsParser.parseField(fc)).toEqual([]);
    });

    it('should return an array with errors', () => {
      fc = new FormControl('', Validators.required);
      expect(FormErrorsParser.parseField(fc)).toEqual(["Campo obrigatório"]);
    });

    it('should return an array with errors', () => {
      fc = new FormControl('renan@122222234221', forbiddenCharactersValidator(/[@\d]/g));
      expect(FormErrorsParser.parseField(fc)).toEqual(["Caracteres inválidos: @1234"]);
    });

  });
});
