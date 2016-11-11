import { Validator, Validations } from './validator';

describe('Validator', () => {
	it('tests required filter', () => {
		expect(Validator.validate('', { validations: { required: true }} )).toEqual(['Este campo é obrigatório']);
		expect(Validator.validate('', { validations: { required: true }, messages: {required: 'Campo obrigatório'}} )).toEqual(['Campo obrigatório']);
		expect(Validator.validate('', { validations: { required: true , length: {min: 10}}})).toEqual(['Este campo é obrigatório','Utilize ao menos 10 caracteres']);
		expect(Validator.validate('', { validations: {}})).toEqual([]);
	});
});