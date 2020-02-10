import { addParameters } from '@storybook/react';

const categories = [
	'Typographie',
	'Navigation',
	'Layout',
	'Messaging & Communication',
	'Controls',
	'Data',
	'Deprecated',
];

addParameters({
	options: {
		storySort: (a, b) => {
			const aCat = a[1].kind?.split('/')[0] || '';
			const bCat = b[1].kind?.split('/')[0] || '';
			const aLevel = categories.indexOf(aCat);
			const bLevel = categories.indexOf(bCat);

			return aLevel - bLevel;
		},
	},
});
