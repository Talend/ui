import { addParameters } from '@storybook/react';

const categories = [
	'Design Principles',
	'Writing Principles',
	'Navigation',
	'Layout',
	'Buttons',
	'Messaging & Communication',
	'Form',
	'Data',
	'Deprecated',
];

addParameters({
	options: {
		storySort: function(a, b) {
			const aCat = a[1].kind ? a[1].kind.split('/')[0] : '';
			const bCat = b[1].kind ? b[1].kind.split('/')[0] : '';
			const aLevel = categories.indexOf(aCat);
			const bLevel = categories.indexOf(bCat);

			return aLevel - bLevel;
		},
	},
});
