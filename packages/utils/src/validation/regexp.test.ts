import { EMAIL, NAME, DOMAIN } from './regexp';

describe('regexp', () => {
	describe('EMAIL', () => {
		const validEmails = [
			'sarah@something',
			'sarah@something.fr',
			'sarah.connor@trmn.com',
			'user+tag@example.org',
			'a@b.co',
		];

		const invalidEmails = ['john', 'john@', 'john @', 'john\\@re', '@nodomain', 'no@spa ce.com'];

		test.each(validEmails)('"%s" should match EMAIL', value =>
			expect(EMAIL.test(value)).toBe(true),
		);

		test.each(invalidEmails)('"%s" should not match EMAIL', value =>
			expect(EMAIL.test(value)).toBe(false),
		);
	});

	describe('NAME', () => {
		const validNames = [
			'Sarah',
			'sarah-bernard',
			'John Doe',
			'Charles the 3rd',
			'John Sr.',
			'Іванна',
			'Αλέξης',
			'佐藤',
		];

		const invalidNames = [
			'Jo~hn',
			'Jo!hn',
			'Jo@hn',
			'Jo#hn',
			'Jo$hn',
			'Jo%hn',
			'Jo^hn',
			'Jo&hn',
			'Jo*hn',
			'Jo(hn',
			'Jo)hn',
			'Jo|hn',
			'Jo+hn',
			'Jo=hn',
			'Jo?hn',
			'Jo;hn',
			'Sa:ra',
			'Sa"ra',
			'Sa,ra',
			'Sa<ra',
			'Sa>ra',
			'Sa{ra',
			'Sa}ra',
			'Sa[ra',
			'Sa]ra',
			'Sa\\ra',
			'Sa/ra',
			'Sa¤ra',
			'Sa€ra',
			'Sa¨ra',
			'Sa£ra',
			'Sa°ra',
			'Sa§ra',
		];

		test.each(validNames)('"%s" should match NAME', value => expect(NAME.test(value)).toBe(true));

		test.each(invalidNames)('"%s" should not match NAME', value =>
			expect(NAME.test(value)).toBe(false),
		);
	});

	describe('DOMAIN', () => {
		const validDomains = [
			'example.com',
			'sub.domain.org',
			'localhost',
			'my-domain.co.uk',
			'domain123',
		];

		const invalidDomains = [
			'do~main',
			'do!main',
			'do#main',
			'do$main',
			'do%main',
			'do^main',
			'do&main',
			'do*main',
			'do(main',
			'do)main',
			'do|main',
			'do+main',
			'do=main',
			'do?main',
			'do;main',
			'do:main',
			'do"main',
			'do,main',
			'do<main',
			'do>main',
			'do{main',
			'do}main',
			'do[main',
			'do]main',
			'do\\main',
			'do/main',
			'do¤main',
			'do€main',
			'do¨main',
			'do£main',
			'do°main',
			'do§main',
		];

		test.each(validDomains)('"%s" should match DOMAIN', value =>
			expect(DOMAIN.test(value)).toBe(true),
		);

		test.each(invalidDomains)('"%s" should not match DOMAIN', value =>
			expect(DOMAIN.test(value)).toBe(false),
		);
	});
});
