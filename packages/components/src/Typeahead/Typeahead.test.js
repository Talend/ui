import React from 'react';
import { mount } from 'enzyme';
import faker from 'faker';

import Typeahead from './Typeahead.component';

jest.useFakeTimers();

faker.seed(42);
describe('Typeahead', () => {
	const initialProps = {
		id: faker.random.word(),
		icon: {
			name: 'fa fa-search',
			title: 'icon',
			bsStyle: 'link',
		},
	};

	const items = [
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
			typeaheadInstance
				.find('Action')
				.at(0)
				.simulate('click');

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

		it('should call onChange event with debounce options', () => {
			// given
			const initialTimeoutCount = setTimeout.mock.calls.length;
			const onChange = jest.fn();
			const debounceTimeout = 300;
			const props = {
				...initialProps,
				onChange,
				debounceTimeout,
			};
			const typeahead = <Typeahead {...props} />;
			const event = { target: { value: faker.random.word() } };

			// when
			const typeaheadInstance = mount(typeahead);
			typeaheadInstance.find('input').simulate('change', event);

			// then
			expect(setTimeout.mock.calls.length).toBe(initialTimeoutCount + 1);
			expect(setTimeout.mock.calls[0][1]).toBe(debounceTimeout);
		});

		it('should call onChange event with debounceMinLength options', () => {
			// given
			const initialTimeoutCount = setTimeout.mock.calls.length;
			const onChange = jest.fn();
			const debounceTimeout = 300;
			const props = {
				...initialProps,
				onChange,
				debounceTimeout,
				debounceMinLength: 3,
			};
			const typeahead = <Typeahead {...props} />;
			const underMinLengthEvent = { target: { value: '2' } };
			const overMinLengthEvent = { target: { value: faker.random.word() } };

			// when
			const typeaheadInstance = mount(typeahead);
			typeaheadInstance.find('input').simulate('change', underMinLengthEvent);

			// then
			expect(setTimeout.mock.calls.length).toBe(initialTimeoutCount);

			// when
			typeaheadInstance.find('input').simulate('change', overMinLengthEvent);

			// then
			expect(setTimeout.mock.calls.length).toBe(initialTimeoutCount + 1);
			expect(setTimeout.mock.calls[0][1]).toBe(debounceTimeout);
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
			typeaheadInstance
				.find('Item')
				.at(0)
				.simulate('mouseDown');

			// then
			expect(onSelect).toBeCalled();
		});
	});
});
