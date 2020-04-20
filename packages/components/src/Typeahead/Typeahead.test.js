import React from 'react';
import { mount } from 'enzyme';
import Typeahead, { getItems } from './Typeahead.component';

describe('Typeahead', () => {
	const initialProps = {
		id: 'my-search',
		icon: {
			name: 'fa fa-search',
			title: 'icon',
			bsStyle: 'link',
		},
	};

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

	const flatItems = [
		{ name: 'First item ', value: 'item-1' },
		{ name: 'Second item ', value: 'item-2' },
		{ name: 'Third item ', value: 'item-3' },
	];

	const noHeaderItems = [
		{
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
	];

	describe('toggle button', () => {
		it('should be hidden if docked property is not true', () => {
			// given
			const props = {
				...initialProps,
				onToggle: jest.fn(),
				docked: false,
			};
			const typeahead = <Typeahead {...props} />;

			// when
			const typeaheadInstance = mount(typeahead);

			// then
			expect(typeaheadInstance.find('Action').length).toBe(0);
		});

		it('should be shown if docked property is true', () => {
			// given
			const props = {
				...initialProps,
				onToggle: jest.fn(),
				docked: true,
			};
			const typeahead = <Typeahead {...props} />;

			// when
			const typeaheadInstance = mount(typeahead);

			// then
			expect(typeaheadInstance.find('Action').length).toBe(1);
		});

		it('should call onToggle', () => {
			// given
			const props = {
				...initialProps,
				onToggle: jest.fn(),
				docked: true,
			};
			const typeahead = <Typeahead {...props} />;

			// when
			const typeaheadInstance = mount(typeahead);
			typeaheadInstance.find('Button.tc-typeahead-toggle').at(0).simulate('click');

			// then
			expect(props.onToggle).toBeCalled();
		});
	});

	describe('input', () => {
		it('should call onChange', () => {
			// given
			const onChange = jest.fn();
			const props = {
				...initialProps,
				onChange,
			};
			const typeahead = <Typeahead {...props} />;
			const event = { target: { value: 'toto' } };

			// when
			const typeaheadInstance = mount(typeahead);
			typeaheadInstance.find('input').simulate('change', event);

			// then
			expect(onChange).toBeCalled();
		});

		it('should call onBlur', () => {
			// given
			const onBlur = jest.fn();
			const props = {
				...initialProps,
				onBlur,
			};
			const typeahead = <Typeahead {...props} />;

			// when
			const typeaheadInstance = mount(typeahead);
			typeaheadInstance.find('input').simulate('blur');

			// then
			expect(onBlur).toBeCalled();
		});
	});

	describe('item', () => {
		it('should call onSelect', () => {
			// given
			const onSelect = jest.fn();
			const props = {
				...initialProps,
				onSelect,
				items,
			};
			const typeahead = <Typeahead {...props} />;

			// when
			const typeaheadInstance = mount(typeahead);
			typeaheadInstance.find('Item').at(0).simulate('click');

			// then
			expect(onSelect).toBeCalled();
		});
	});
	it('should not display section header if there are no title or icon', () => {
		// given
		const props = {
			...initialProps,
			onToggle: jest.fn(),
			docked: false,
			items: noHeaderItems,
		};
		const typeahead = <Typeahead {...props} />;

		// when
		const typeaheadInstance = mount(typeahead);

		// then
		expect(typeaheadInstance.find('.tc-typeahead-section-header').length).toBe(0);
	});
	it('should display section header', () => {
		// given
		const props = {
			...initialProps,
			onToggle: jest.fn(),
			docked: false,
			items,
		};
		const typeahead = <Typeahead {...props} />;

		// when
		const typeaheadInstance = mount(typeahead);

		// then
		expect(typeaheadInstance.find('.tc-typeahead-section-header').length).toBe(2);
	});

	describe('getItems', () => {
		it('should return an empty array if provided collection is null', () => {
			const computedItems = getItems(null);
			expect(computedItems).toEqual([]);
		});
		it('should return an empty array if provided collection is undefined', () => {
			const computedItems = getItems(undefined);
			expect(computedItems).toEqual([]);
		});
		it('should return provided array if dataFeature props is falsy', () => {
			const computedItems = getItems(flatItems);
			expect(computedItems).toBe(flatItems);
		});
		it('should return an array with a data-feature property on each item that equals the concat of the prop and the value of the item', () => {
			const dataFeatureContext = 'data-feature-context';
			const computedItems = getItems(flatItems, dataFeatureContext);
			expect(computedItems.length).toBe(flatItems.length);
			for (let i = 0; i < flatItems.length; i += 1) {
				expect(computedItems[i]['data-feature']).toBe(`${dataFeatureContext}.${flatItems[i].value}`);
			}
		});
	});
});
