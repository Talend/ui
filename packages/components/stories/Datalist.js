import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';

import { Datalist, IconsProvider } from '../src/index';

const propsMultiSection = {
	disabled: false,
	multiSection: true,
	placeholder: 'search for something ...',
	readOnly: false,
	titleMap: [
		{ title: 'cat 1', suggestions: [{ name: 'foo', value: 'foo' }, { name: 'faa', value: 'faa' }] },
		{ title: 'cat 2', suggestions: [{ name: 'bar', value: 'bar' }] },
		{ title: 'cat 3', suggestions: [{ name: 'foobar', value: 'foobar' }] },
		{ title: 'cat 4', suggestions: [{ name: 'lol', value: 'lol' }] },
	],
	onFinish: action('onFinish'),
	onChange: action('onChange'),
};

const singleSectionProps = {
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
	.addDecorator(story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>)
	.addWithInfo('default multiSection', () => {
		const restrictedValues = { ...propsMultiSection, restricted: true };
		const defaultValue = { ...propsMultiSection, value: 'lol' };
		return (
			<form className="form">
				<IconsProvider />
				<h3>By default :</h3>
				<Datalist {...propsMultiSection} />
				<h3>default value :</h3>
				<Datalist {...defaultValue} />
				<h3>Restricted values :</h3>
				<Datalist {...restrictedValues} />
				<h3>Auto focused :</h3>
				<Datalist {...propsMultiSection} autoFocus />
			</form>
		);
	})
	.addWithInfo('default single section', () => {
		const restrictedValues = { ...singleSectionProps, restricted: true };
		const defaultValue = { ...singleSectionProps, value: 'lol' };
		return (
			<form className="form">
				<IconsProvider />
				<h3>By default :</h3>
				<Datalist {...singleSectionProps} />
				<h3>default value :</h3>
				<Datalist {...defaultValue} />
				<h3>Restricted values :</h3>
				<Datalist {...restrictedValues} />
				<h3>Loading :</h3>
				<Datalist {...singleSectionProps} titleMap={[]} isLoading />
				<h3>Auto focused :</h3>
				<Datalist {...singleSectionProps} autoFocus />
			</form>
		);
	});
