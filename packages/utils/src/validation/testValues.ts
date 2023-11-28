// List of values used in the tests

// Names
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

// Emails
export const validEmails: Array<string> = [
	'sarah@something',
	'sarah@something.fr',
	'sarah.connor@trmn.com',
];

export const invalidEmails: Array<string> = ['john', 'john@', 'john @', 'john\\@re'];
