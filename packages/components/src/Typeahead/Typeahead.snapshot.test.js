import React from 'react';
import renderer from 'react-test-renderer';
import Typeahead from './Typeahead.component';

const itemsObject = [
	{
		title: 'category 1',
		icon: {
			name: 'fa fa-filter',
			title: 'icon',
			role: 'search',
		},
		suggestions: [
			{
				title: 'le title 1',
				description:
					'description: Uxoresque est in pacto est marito est hastam nomine in eos discessura incredibile tempus ardore.',
			},
			{
				title: 'title 2 les elephants elementaires ont des aile ',
				description:
					'description: Aut aut cum satis inter Epicuri quidem cum erat inquam controversia autem mihi utrumque Attico.',
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
				description:
					'description: In sanciatur libere audeamus exspectemus amicitia et dum ne audeamus causa monendum honesta studium valeat.',
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
				docked: true,
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
				role: 'searchbox',
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
				'data-feature': 'data-feature-typeahead',
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

		it('should render typeahead with loading entry', () => {
			// given
			const props = {
				id: 'my-search',
				items: [],
				isLoading: true,
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

	describe('injection', () => {
		it('should use render props to inject extra components', () => {
			// given
			const props = {
				id: 'my-search',
				items: itemsString,
				multiSection: false,
			};
			// when
			const wrapper = renderer
				.create(
					<Typeahead {...props}>
						{(content, { searching, loading, noResult, isShown }) => (
							<div>
								<div>Searching: {searching}</div>
								<div>Loading: {loading}</div>
								<div>No Result: {noResult}</div>
								<div>Is Shown: {isShown}</div>
								{content}
								<button>Click</button>
							</div>
						)}
					</Typeahead>,
				)
				.toJSON();

			// then
			expect(wrapper).toMatchSnapshot();
		});
	});

	it('should pass input extra props', () => {
		// given
		const props = {
			id: 'my-search',
			position: 'right',
			role: 'searchbox',
			inputProps: {
				'aria-label': 'my custom label',
				'aria-describedby': 'desc-id',
			},
		};

		// when
		const wrapper = renderer.create(<Typeahead {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
