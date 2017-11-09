import React from 'react';
import renderer from 'react-test-renderer';
import faker from 'faker';

import Typeahead from './Typeahead.component';

jest.mock('react-dom');

faker.seed(42);
const itemsObject = [
	{
		title: faker.random.words(),
		icon: {
			name: 'fa fa-filter',
			title: 'icon',
		},
		suggestions: [
			{
				title: faker.random.words(),
				description: faker.lorem.sentence(10),
			},
			{
				title: faker.random.words(),
				description: faker.lorem.sentence(10),
			},
		],
	},
	{
		title: faker.random.words(),
		icon: {
			name: 'fa fa-asterisk',
			title: 'icon',
		},
		suggestions: [
			{
				title: faker.random.words(),
				description: faker.lorem.sentence(10),
			},
		],
	},
];

const itemsString = ['category 1', 'category 2'];

describe('Typeahead', () => {
	describe('with toggle', () => {
		it('should render button', () => {
			// given
			const props = {
				id: 'my-search',
				onToggle: jest.fn(),
				icon: {
					name: 'fa fa-search',
					title: 'Toggle search bar',
					bsStyle: 'link',
				},
			};

			// when
			const wrapper = renderer.create(<Typeahead {...props} />).toJSON();

			// then
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('position', () => {
		it('should render search bar on the right', () => {
			// given
			const props = {
				id: 'my-search',
				position: 'right',
			};

			// when
			const wrapper = renderer.create(<Typeahead {...props} />).toJSON();

			// then
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('items', () => {
		it('should render typeahead with string items', () => {
			// given
			const props = {
				id: 'my-search',
				items: itemsString,
				multiSection: false,
			};
			// when
			const wrapper = renderer.create(<Typeahead {...props} />).toJSON();

			// then
			expect(wrapper).toMatchSnapshot();
		});

		it('should render typeahead with object items', () => {
			// given
			const props = {
				id: 'my-search',
				items: itemsObject,
			};
			// when
			const wrapper = renderer.create(<Typeahead {...props} />).toJSON();

			// then
			expect(wrapper).toMatchSnapshot();
		});

		it('should render typeahead without items', () => {
			// given
			const props = {
				id: 'my-search',
				items: [],
			};

			// when
			const wrapper = renderer.create(<Typeahead {...props} />).toJSON();

			// then
			expect(wrapper).toMatchSnapshot();
		});

		it('should render typeahead items with match', () => {
			// given
			const props = {
				id: 'my-search',
				value: 'le',
				items: itemsObject,
			};

			// when
			const wrapper = renderer.create(<Typeahead {...props} />).toJSON();

			// then
			expect(wrapper).toMatchSnapshot();
		});
	});
});
