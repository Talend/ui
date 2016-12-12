import React from 'react';
import { mount } from 'enzyme';
import Typeahead from './Typeahead.component';

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
			suggestions: [{
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

	describe('toggle button', () => {
		it('should call onToggle', () => {
			// given
			const props = {
				...initialProps,
				onToggle: jest.fn(),
			};
			const typeahead = <Typeahead {...props} />;

			// when
			const typeaheadInstance = mount(typeahead);
			typeaheadInstance.find('Action').at(0).simulate('click');

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
});
