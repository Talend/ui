import React from 'react';
import { mount } from 'enzyme';
import Typeahead from './Typeahead.component';

jest.useFakeTimers();

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
			const event = { target: { value: 'toto' } };

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
			const overMinLengthEvent = { target: { value: 'toto' } };

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

	describe('custom renders', () => {
		it('should render custom element', () => {
			// given
			const props = {
				items,
				multiSection: false,
				renderResults: () => <button id="do-some-stuff">Do some stuff</button>,
			};

			// when
			const wrapper = mount(<Typeahead {...props} />);
			// then
			expect(wrapper.find('#do-some-stuff').length).toBe(1);
		});
		it('should render custom element with no result', () => {
			// given
			const props = {
				items: [],
				renderNoResult: () => <button id="add-new-btn">Add</button>,
			};

			// when
			const wrapper = mount(<Typeahead {...props} />);

			// then
			expect(wrapper.find('#add-new-btn').length).toBe(1);
		});
		it('should render custom element when searching', () => {
			// given
			const props = {
				items: [],
				renderSearching: () => <button id="btn-cancel">Cancel</button>,
				searching: true,
			};

			// when
			const wrapper = mount(<Typeahead {...props} />);

			// then
			expect(wrapper.find('#btn-cancel').length).toBe(1);
		});
		it('should render custom element when loading', () => {
			// given
			const props = {
				items: [],
				renderLoading: () => <button id="wait-a-moment">Wait</button>,
				isLoading: true,
			};

			// when
			const wrapper = mount(<Typeahead {...props} />);

			// then
			expect(wrapper.find('#wait-a-moment').length).toBe(1);
		});
	});
});
