import { validFirstName, validLastName, validEmail, validPhone } from './methods';

describe('methods', () => {
	const validNames: Array<string> = [
		'Sarah',
		'sarah-bernard',
		'John Doe',
		'Charles the 3rd',
		'John Sr.' ,
		'Іванна',
		'Αλέξης',
		'佐藤',
	];

	const invalidNames: Array<string> = [
		'Jo@hn',
		'Jo#hn',
		'Jo$hn',
		'Jo%hn',
		'Jo^hn',
		'Jo&hn',
		'Jo(hn',
		'Jo)hn',
		'Jo|hn',
		'Jo=hn',
		'Jo?hn',
		'Jo;hn',
		'Sa:ra',
		'Sa,ra',
		'Sa&ra',
		'Sa¤ra',
		'Sa€ra',
		'Sa¨ra',
		'Sa£ra',
		'Sa"ra',
		'Sa°ra',
		'Sa§ra',
		'Sa*ra',
	];

	describe('validFirstName', () => {
		// Test valid values
		test.each(validNames)(
			'"%s" should be an acceptable first name',
			(value: string) => expect(validFirstName(value)).toBe(true),
		);

		// Test invalid values
		test.each(invalidNames)(
			'"%s" should not be an acceptable first name',
			(value: string) => expect(validFirstName(value)).toBe(false),
		);
	});

	describe('validLastName', () => {
		// Test valid values
		test.each(validNames)(
			'"%s" should be an acceptable last name',
			(value: string) => expect(validLastName(value)).toBe(true),
		);

		// Test invalid values
		test.each(invalidNames)(
			'"%s" should not be an acceptable last name',
			(value: string) => expect(validLastName(value)).toBe(false),
		);
	});

	describe('validEmail', () => {
		const validEmails: Array<string> = [
			'sarah@something',
			'sarah@something.fr',
		];

		const invalidEmails: Array<string> = [
			'john',
			'john@',
			'john @',
		];

		// Test valid values
		test.each(validEmails)(
			'"%s" should be an acceptable email',
			(value: string) => expect(validEmail(value)).toBe(true),
		);

		// Test invalid values
		test.each(invalidEmails)(
			'"%s" should not be an acceptable email',
			(value: string) => expect(validEmail(value)).toBe(false),
		);
	});

	describe('validPhone', () => {
		const validPhones: Array<string> = [
			'+33102030405',
		];

		const invalidPhones: Array<string> = [
			'john',
			'john@',
			'john @',
			'sarah@something.fr',
			'Fred',
		];

		// Test valid values
		test.each(validPhones)(
			'"%s" should be an acceptable phone',
			(value: string) => expect(validPhone(value)).toBe(true),
		);

		// Test invalid values
		test.each(invalidPhones)(
			'"%s" should not be an acceptable phone',
			(value: string) => expect(validPhone(value)).toBe(false),
		);
	});
});
