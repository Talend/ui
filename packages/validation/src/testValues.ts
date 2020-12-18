// List of values used in the tests

export const validNames: Array<string> = [
	'Sarah',
	'sarah-bernard',
	'John Doe',
	'Charles the 3rd',
	'John Sr.',
	'Іванна',
	'Αλέξης',
	'佐藤',
];

export const invalidNames: Array<string> = [
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

export const validEmails: Array<string> = [
	'sarah@something',
	'sarah@something.fr',
];

export const invalidEmails: Array<string> = [
	'john',
	'john@',
	'john @',
];


export const validPhones: Array<string> = [
	'+33102030405',
];

export const invalidPhones: Array<string> = [
	'john',
	'john@',
	'john @',
	'sarah@something.fr',
	'Fred',
];
