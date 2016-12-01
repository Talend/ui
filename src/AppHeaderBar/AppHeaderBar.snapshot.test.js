import React from 'react';
import renderer from 'react-test-renderer';
import AppHeaderBar from './AppHeaderBar.component';
import {
	exampleId,
	focusedItemIndex,
	focusedSectionIndex,
	renderItemData,
	inputProps,
	itemProps,
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
				id: exampleId,
				config: {
					isOnlyIcon: true,
					icon: {
						name: 'fa fa-search',
						title: 'icon',
						actionStyle: 'link',
					},
					onInputIconClick: jest.fn(),
				},
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
				id: exampleId,
				config: {
					icon: {
						name: 'fa fa-search',
						title: 'icon',
					},
				},
				inputProps,
				itemProps,
				focusedItemIndex,
				focusedSectionIndex,
				renderItemData,
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
