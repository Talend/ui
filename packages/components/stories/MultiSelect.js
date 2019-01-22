import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MultiSelect from '../src/MultiSelect';


function onSelect(value, title) {
	return {
		onSelect: action(`selec ${value} ${title}`),
	};
}

const titleMap = [
	{ value: '123', name: 'Super stuff' },
];

storiesOf('MultiSelect', module)
	.add('default', () => (
		<section>
			<MultiSelect id="storybook" titleMap={titleMap} values={[]} onSelect={onSelect} />
		</section>
	));
