import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Datalist, IconsProvider } from '../src/index';

const props = {
	autoFocus: true,
	disabled: false,
	placeholder: 'search for something ...',
	readOnly: false,
	titleMap: [
		{ name: 'foo', value: 'foo' },
		{ name: 'bar', value: 'bar' },
		{ name: 'foobar', value: 'foobar' },
		{ name: 'lol', value: 'lol' },
	],
};

storiesOf('Datalist', module)
	.addDecorator(story => (
		<div className="col-lg-offset-2 col-lg-8">
			{story()}
		</div>
	))
	.addWithInfo('default', () => {
		const withoutAutoFocus = { ...props, autoFocus: false };
		return (
			<div>
				<p>By default :</p>
				<Datalist {...withoutAutoFocus} />
				<p>Auto focused :</p>
				<Datalist {...props} />
			</div>
		)
	})
