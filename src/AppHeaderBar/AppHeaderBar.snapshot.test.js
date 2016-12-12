import React from 'react';
import renderer from 'react-test-renderer';
import AppHeaderBar from './AppHeaderBar.component';
import {
	search,
	inputForm,
	props,
} from './test.props';

jest.mock('react-dom');

describe('AppHeaderBar', () => {
	it('should render', () => {
		// given
		const appBar = <AppHeaderBar {...props} />;

		// when
		const appBarInstance = renderer.create(appBar).toJSON();

		// then
		expect(appBarInstance).toMatchSnapshot();
	});

	it('should render without brandLink', () => {
		// given
		const myprops = Object.assign({}, props);
		delete myprops.brandLink;
		const appBar = <AppHeaderBar {...myprops} />;

		// when
		const appBarInstance = renderer.create(appBar).toJSON();

		// then
		expect(appBarInstance).toMatchSnapshot();
	});

	it('should render with form', () => {
		// given
		props.content[1] = inputForm;
		const appBar = <AppHeaderBar {...props} />;

		// when
		const appBarInstance = renderer.create(appBar).toJSON();

		// then
		expect(appBarInstance).toMatchSnapshot();
	});

	it('should render with Typeahead Icon', () => {
		// given
		props.content[1] =
		{
			search: {
				id: 'my-search',
				icon: {
					name: 'fa fa-search',
					title: 'icon',
					bsStyle: 'link',
				},
				onToggle: jest.fn(),
			},
		};
		const appBar = <AppHeaderBar {...props} />;

		// when
		const appBarInstance = renderer.create(appBar).toJSON();

		// then
		expect(appBarInstance).toMatchSnapshot();
	});

	it('should render with only Typeahead input', () => {
		// given
		props.content[1] = {
			search: {
				id: 'my-search',
				config: {
					icon: {
						name: 'fa fa-search',
						title: 'icon',
					},
				},
				value: 'le',
				placeholder: 'Search anything',
			},
		};
		const appBar = <AppHeaderBar {...props} />;

		// when
		const appBarInstance = renderer.create(appBar).toJSON();

		// then
		expect(appBarInstance).toMatchSnapshot();
	});

	it('should render with Typeahead items', () => {
		// given
		props.content[1] = { search };
		const appBar = <AppHeaderBar {...props} />;

		// when
		const appBarInstance = renderer.create(appBar).toJSON();

		// then
		expect(appBarInstance).toMatchSnapshot();
	});
});
