export interface Validations {
		validations: {
			required?: boolean
			length?: { min?: number, max?: number }
			pattern?: RegExp
			invalidCharacters?: RegExp
		};
		messages?: {
			required?: string,
			length?: { min?: string, max?: string},
			pattern?: string,
			invalidCharacters?: string
		};
}

export class Validator {
	static validate(value: string, rules: Validations): string[] {
		let requiredError: string;

		if (rules === undefined){
			throw new Error('Validation rules not provided');
		}

		let errors: string[] = [];

		/**
		 * Checks if the tested value is required
		 */
		if (rules.validations.required && value.trim().length === 0) {
			requiredError = (rules.messages && rules.messages.required) 
																? rules.messages.required 
																: 'Este campo é obrigatório';
			errors.push(requiredError);
		}

		/**
		 * Checks if there is any lenght validation rules
		 */
		let validationsLength = rules.validations.length;
		if(validationsLength) {

			let lengthMessages: { min?: string, max?: string } | null = (rules.messages && rules.messages.length) 
																															  ? rules.messages.length
																															  : null;
			/**
			 * Validates for min length
			 */
			if(! requiredError && validationsLength.min && validationsLength.min > value.trim().length ) {
				let minLengthError: string = (lengthMessages && lengthMessages.min) 
																	 ? lengthMessages.min
																	 : `Utilize ao menos ${validationsLength.min} caracteres`;

				errors.push(minLengthError);
			}

			/**
			 * Validates from max length
			 */
			if(validationsLength.max && validationsLength.max < value.trim().length) {
				let maxLengthError: string = (lengthMessages && lengthMessages.max) 
																	 ? lengthMessages.max
																	 : `Utilize no máximo  ${validationsLength.max} caracteres`;

				errors.push(maxLengthError);
			}
		}

		/**
		 * Checks if the value matches the given pattern
		 */
		if(rules.validations.pattern && ! rules.validations.pattern.test(value)) {
			let patternError: string = (rules.messages && rules.messages.pattern)
															 ? rules.messages.pattern
															 : `Formato inválido`;

			errors.push(patternError);
		}	

		/**
		 * Checks if there is any invalid character in the string
		 */
		if(rules.validations.invalidCharacters) {
			let invalidMatches: any = value.trim().match(rules.validations.invalidCharacters);

			if(invalidMatches instanceof Array) {
				let uniqueInvalidMatches: string[] = [];

				invalidMatches.map((invalidChar) => {
					if(uniqueInvalidMatches.indexOf(invalidChar) === -1)
						uniqueInvalidMatches.push(invalidChar);
				});

				let invalidCharsError: string = (rules.messages && rules.messages.invalidCharacters)
																			? rules.messages.invalidCharacters
																			: `Não utilizes estes caracteres: ${uniqueInvalidMatches.join('')}`;

				errors.push(invalidCharsError);
			}
		}


		return errors;
	}
}