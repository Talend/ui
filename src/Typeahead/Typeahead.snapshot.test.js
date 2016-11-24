import React from 'react';
import renderer from 'react-test-renderer';
import Typeahead from './Typeahead.component';

jest.mock('react-dom');

const exampleId = 'component-id';
const focusedItemIndex = 1;
const focusedSectionIndex = 0;
const value = 'le';
const renderItemData = { value };
const inputProps = {
	value,
	placeholder: 'Search anything',
};

const itemProps = {};

const items = [
	{
		title: 'category 1',
		icon: {
			name: 'fa fa-filter',
			title: 'icon',
		},
		suggestions: [
			{
				title: 'le title 1',
				description: 'description: Uxoresque est in pacto est marito est hastam nomine in eos discessura incredibile tempus ardore.',
			},
			{
				title: 'title 2 les elephants elementaires ont des aile ',
				description: 'description: Aut aut cum satis inter Epicuri quidem cum erat inquam controversia autem mihi utrumque Attico.',
			},
		],
	},

	{
		title: 'category 2',
		icon: {
			name: 'fa fa-asterisk',
			title: 'icon',
		},
		suggestions: [
			{
				title: 'title 3',
				description: 'description: In sanciatur libere audeamus exspectemus amicitia et dum ne audeamus causa monendum honesta studium valeat.',
			},
		],
	}];

const onlyIconProps = {
	id: exampleId,
	config: {
		isOnlyIcon: true,
		icon: {
			name: 'fa fa-search',
			title: 'icon',
		},
		onInputIconClick: jest.fn(),
	},
	items: [],
};

const typeaheadProps = {
	id: exampleId,
	config: {
		icon: {
			name: 'fa fa-search',
			title: 'icon',
			actionStyle: 'link',
		},
	},
	inputProps,
	itemProps,
	focusedItemIndex,
	focusedSectionIndex,
	renderItemData,
};


describe('Only icon', () => {
	it('should render only zoom icon', () => {
		// given
		const wrapper = renderer
			.create(<Typeahead {...onlyIconProps} />)
			.toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});

describe('Typeahead', () => {
	describe('icon', () => {
		it('should render typeahead with icon', () => {
			// when
			const wrapper = renderer
				.create(<Typeahead {...typeaheadProps} />)
				.toJSON();

			// then
			expect(wrapper).toMatchSnapshot();
		});

		it('should render typeahead without icon', () => {
			// given
			const myProps = Object.assign({}, typeaheadProps);
			myProps.config = {};

			// when
			const wrapper = renderer
				.create(<Typeahead {...myProps} />)
				.toJSON();

			// then
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('position', () => {
		it('should render typeahead (LEFT ==> RIGHT)', () => {
			// given
			const myProps = Object.assign({}, typeaheadProps);
			myProps.config = {};
			myProps.items = items;

			// when
			const wrapper = renderer
				.create(<Typeahead {...myProps} />)
				.toJSON();

			// then
			expect(wrapper).toMatchSnapshot();
		});
		// The case when the Typeahead is from RIGHT ==> LEFT is not covered by snapshots,
		// because currently it is not possible to import theme in snapshots.
	});

	describe('items', () => {
		it('should render typeahead with items', () => {
			// given
			const myProps = Object.assign({}, typeaheadProps);
			myProps.config = {};
			myProps.items = items;

			// when
			const wrapper = renderer
				.create(<Typeahead {...myProps} />)
				.toJSON();

			// then
			expect(wrapper).toMatchSnapshot();
		});

		it('should render typeahead without items', () => {
			// given
			const myProps = Object.assign({}, typeaheadProps);
			myProps.config = {};

			// when
			const wrapper = renderer
				.create(<Typeahead {...myProps} />)
				.toJSON();

			// then
			expect(wrapper).toMatchSnapshot();
		});

		it('should render typeahead items with match', () => {
			// given
			const myProps = Object.assign({}, typeaheadProps);
			myProps.config = {};
			myProps.items = items;
			myProps.renderItemData = renderItemData;

			// when
			const wrapper = renderer
				.create(<Typeahead {...myProps} />)
				.toJSON();

			// then
			expect(wrapper).toMatchSnapshot();
		});
	});
});
