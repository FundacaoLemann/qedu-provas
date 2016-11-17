import { FormControl, Validators } from '@angular/forms';
import { forbiddenCharactersValidator } from '../shared/';
import { CustomFormErrors } from './custom-form-errors';

let fc: FormControl;

describe('Class: CustomFormErrors', () => {

	describe('parseField()', () => {
		it('should return an empty array', () => {
			fc = new FormControl('renan', Validators.required);
			expect(CustomFormErrors.parseField(fc)).toEqual([]);
		});

		it('should return an array with errors', () => {
			fc = new FormControl('', Validators.required);
			expect(CustomFormErrors.parseField(fc)).toEqual(["Campo obrigatório"]);
		});

		it('should return an array with errors', () => {
			fc = new FormControl('renan@122222234221', forbiddenCharactersValidator(/[@\d]/g));
			expect(CustomFormErrors.parseField(fc)).toEqual(["Caracteres inválidos: @1234"]);
		});

	});
});