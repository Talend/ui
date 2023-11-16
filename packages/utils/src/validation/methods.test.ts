import { validFirstName, validLastName, validEmail } from './methods';
import { validNames, invalidNames, validEmails, invalidEmails } from './testValues';

describe('methods', () => {
	describe('validFirstName', () => {
		// Test valid values
		test.each(validNames)('"%s" should be an acceptable first name', (value: string) =>
			expect(validFirstName(value)).toBe(true),
		);

		// Test invalid values
		test.each(invalidNames)('"%s" should not be an acceptable first name', (value: string) =>
			expect(validFirstName(value)).toBe(false),
		);
	});

	describe('validLastName', () => {
		// Test valid values
		test.each(validNames)('"%s" should be an acceptable last name', (value: string) =>
			expect(validLastName(value)).toBe(true),
		);

		// Test invalid values
		test.each(invalidNames)('"%s" should not be an acceptable last name', (value: string) =>
			expect(validLastName(value)).toBe(false),
		);
	});

	describe('validEmail', () => {
		// Test valid values
		test.each(validEmails)('"%s" should be an acceptable email', (value: string) =>
			expect(validEmail(value)).toBe(true),
		);

		// Test invalid values
		test.each(invalidEmails)('"%s" should not be an acceptable email', (value: string) =>
			expect(validEmail(value)).toBe(false),
		);
	});
});
