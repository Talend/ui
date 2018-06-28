import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';

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
		{ name: 'My foo', value: 'foo' },
		{ name: 'My bar', value: 'bar' },
		{ name: 'My foobar', value: 'foobar' },
		{ name: 'My lol', value: 'lol' },
	],
	onFinish: action('onFinish'),
	onChange: action('onChange'),
};

storiesOf('Datalist', module)
	.addDecorator(checkA11y)
	.addDecorator(story => (
		<div className="col-lg-offset-2 col-lg-8">
			{story()}
		</div>
	))
	.addWithInfo('default multiSection', () => {
		const withoutAutoFocus = { ...propsMultiSection, autoFocus: false };
		const restrictedValues = { ...propsMultiSection, restricted: true, autoFocus: false };
		const defaultValue = { ...withoutAutoFocus, value: 'lol' };
		return (
			<form className="form">
				<IconsProvider />
				<p>By default :</p>
				<Datalist {...withoutAutoFocus} />
				<p>default value :</p>
				<Datalist {...defaultValue} />
				<p>Restricted values :</p>
				<Datalist {...restrictedValues} />
				<p>Auto focused :</p>
				<Datalist {...propsMultiSection} />
				<p>Loading :</p>
				<Datalist isLoading />
			</form>
		);
	})
	.addWithInfo('default single section', () => {
		const withoutAutoFocus = { ...singleSectionProps, autoFocus: false };
		const restrictedValues = { ...singleSectionProps, restricted: true, autoFocus: false };
		const defaultValue = { ...withoutAutoFocus, value: 'lol' };
		return (
			<form className="form">
				<IconsProvider />
				<p>By default :</p>
				<Datalist {...withoutAutoFocus} />
				<p>default value :</p>
				<Datalist {...defaultValue} />
				<p>Restricted values :</p>
				<Datalist {...restrictedValues} />
				<p>Auto focused :</p>
				<Datalist {...singleSectionProps} />
			</form>
		);
	});
