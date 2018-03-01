import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Datalist, IconsProvider } from '../src/index';

const propsMultiSection = {
	autoFocus: true,
	disabled: false,
	multiSection: true,
	placeholder: 'search for something ...',
	readOnly: false,
	titleMap: [
		{ title: 'cat 1', items: [{ name: 'foo', value: 'foo' }, { name: 'faa', value: 'foo' }] },
		{ title: 'cat 2', items: [{ name: 'bar', value: 'bar' }] },
		{ title: 'cat 3', items: [{ name: 'foobar', value: 'foobar' }] },
		{ title: 'cat 4', items: [{ name: 'lol', value: 'lol' }] },
	],
	onFinish: (event, payload) => {
		console.log('toto');
		console.log(event);
		console.log(payload);
	},
	onChange: (event, payload) => {
		console.log('toto');
		console.log(event);
		console.log(payload);
	},
};

const singleSectionProps = {
	autoFocus: true,
	disabled: false,
	multiSection: false,
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
	.addWithInfo('default multiSection', () => {
		const withoutAutoFocus = { ...propsMultiSection, autoFocus: false };
		return (
			<div>
				<p>By default :</p>
				<Datalist {...withoutAutoFocus} />
				<p>Auto focused :</p>
				<Datalist {...propsMultiSection} />
			</div>
		)
	})
	.addWithInfo('default single section', () => {
		const withoutAutoFocus = { ...singleSectionProps, autoFocus: false };
		return (
			<div>
				<p>By default :</p>
				<Datalist {...withoutAutoFocus} />
				<p>Auto focused :</p>
				<Datalist {...singleSectionProps} />
			</div>
		)
	})
