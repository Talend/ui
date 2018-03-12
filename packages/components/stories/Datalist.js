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
		{ title: 'cat 1', suggestions: [{ name: 'foo', value: 'foo' }, { name: 'faa', value: 'foo' }] },
		{ title: 'cat 2', suggestions: [{ name: 'bar', value: 'bar' }] },
		{ title: 'cat 3', suggestions: [{ name: 'foobar', value: 'foobar' }] },
		{ title: 'cat 4', suggestions: [{ name: 'lol', value: 'lol' }] },
	],
	onFinish: action('onFinish'),
	onChange: action('onChange'),
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
	onFinish: action('onFinish'),
	onChange: action('onChange'),
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
