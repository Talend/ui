import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import DatalistWidget, { escapeRegexCharacters } from './DatalistWidget';

describe('escapeRegexCharacters', () => {
	it('should escape all regex chars', () => {
		// given
		const unescapedString = 'wxc.*+?^${}()|[]\\aze';
		const expectedString = 'wxc\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\aze';

		// when
		const escapedString = escapeRegexCharacters(unescapedString);

		// then
		expect(escapedString).toBe(expectedString);
	});
});

describe('getMatchingSuggestions', () => {
	it('should filter in case insensitive mode', () => {
		// given
		const value = 'aze';
		const suggestions = [
			{ value: 'aze', label: 'aze' },
			{ value: 'banane', label: 'banane' },
			{ value: 'bananAze', label: 'bananAze' },
			{ value: '   AzErTy   ', label: '   AzErTy   ' },
			{ value: 'Toto', label: 'Toto' },
		];
		let widget;
		renderer.create(
			<DatalistWidget
				ref={ref => {
					widget = ref;
				}}
			/>,
		);

		// when
		const filteredSuggestions = widget.getMatchingSuggestions(suggestions, value);

		// then
		expect(filteredSuggestions).toEqual([
			{ value: 'aze', label: 'aze' },
			{ value: 'bananAze', label: 'bananAze' },
			{ value: '   AzErTy   ', label: '   AzErTy   ' },
		]);
	});

	it('should filter with special chars', () => {
		// given
		const value = 'az[e';
		const suggestions = [
			{ value: 'aze', label: 'aze' },
			{ value: 'banane', label: 'banane' },
			{ value: 'bananaz[e', label: 'bananaz[e' },
			{ value: '   az[erty   ', label: '   az[erty   ' },
		];
		let widget;
		renderer.create(
			<DatalistWidget
				ref={ref => {
					widget = ref;
				}}
			/>,
		);

		// when
		const filteredSuggestions = widget.getMatchingSuggestions(suggestions, value);

		// then
		expect(filteredSuggestions).toEqual([
			{ value: 'bananaz[e', label: 'bananaz[e' },
			{ value: '   az[erty   ', label: '   az[erty   ' },
		]);
	});
});

describe('DatalistWidget', () => {
	const schema = {
		enum: ['aze', 'banane', 'bananAze', '   AzErTy   ', 'Toto'],
	};

	it('should render input', () => {
		// when
		const wrapper = renderer
			.create(<DatalistWidget id="myWidget" required schema={{}} onChange={jest.fn()} />)
			.toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render "no match" message', () => {
		// given
		const wrapper = mount(
			<DatalistWidget id="myWidget" required schema={schema} onChange={jest.fn()} />,
		);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('change', { target: { value: 'noMatchingValue' } });

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should render "empty list" message', () => {
		// given
		const wrapper = mount(
			<DatalistWidget
				id="myWidget"
				required
				schema={{}}
				onChange={jest.fn()}
				renderEmptyList={() => 'Empty list'}
			/>,
		);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('focus');

		// then
		expect(wrapper.find('div.tf-typeahead-container').text()).toEqual('Empty list');
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should render all suggestions on focus', () => {
		// given
		const wrapper = mount(
			<DatalistWidget id="myWidget" required schema={schema} onChange={jest.fn()} />,
		);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('focus');

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should render hightlighted matching suggestions on value change', () => {
		// given
		const wrapper = mount(
			<DatalistWidget id="myWidget" required schema={schema} onChange={jest.fn()} />,
		);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('change', { target: { value: 'aze' } });

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should set value and reset suggestions on suggestion selection', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<DatalistWidget id="myWidget" required schema={schema} onChange={onChange} />,
		);

		wrapper
			.find('input')
			.at(0)
			.simulate('focus'); // to display suggestions

		// when
		wrapper.find('li#react-autowhatever-myWidget--item-0').simulate('mouseDown');

		// then
		expect(onChange).toBeCalledWith('aze');
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should set value when receiving a new value from props', () => {
		const onChange = jest.fn();
		const wrapper = mount(
			<DatalistWidget id="myWidget" required schema={schema} onChange={onChange} />,
		);

		wrapper.setProps({ value: 'new' });

		// then
		expect(wrapper.state('value')).toEqual('new');
	});

	it('should not change the value if it is the same', () => {
		// given
		const onChange = jest.fn();
		const value = 'aze';
		const wrapper = mount(
			<DatalistWidget id="myWidget" value={value} required schema={schema} onChange={onChange} />,
		);
		wrapper
			.find('input')
			.at(0)
			.simulate('focus'); // to display suggestions

		// when
		wrapper.find('li#react-autowhatever-myWidget--item-0').simulate('mouseDown');

		// then
		expect(onChange).not.toBeCalled();
	});

	it('should reset value on unknown value input blur', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<DatalistWidget
				id="myWidget"
				required
				schema={schema}
				onChange={onChange}
				options={{ restricted: true }}
			/>,
		);
		const input = wrapper.find('input').at(0);

		// when
		input.simulate('blur', { target: { value: 'unknown' } });

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should select known value on input blur', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<DatalistWidget
				id="myWidget"
				required
				schema={schema}
				onChange={onChange}
				options={{ restricted: true }}
			/>,
		);
		const input = wrapper.find('input').at(0);

		// when
		input.simulate('focus');
		input.simulate('change', { target: { value: 'banane' } });
		input.simulate('blur');

		// then
		expect(onChange).toBeCalled();
		expect(wrapper.find('input').prop('value')).toEqual('banane');
	});

	it('should select known value on input blur with enumOptions', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<DatalistWidget
				id="myWidget"
				required
				schema={schema}
				onChange={onChange}
				options={{ enumOptions: [{ label: 'foo', value: 'bar' }], restricted: true }}
			/>,
		);
		const input = wrapper.find('input').at(0);

		// when
		input.simulate('focus');
		input.simulate('change', { target: { value: 'bar' } });
		input.simulate('blur');

		// then
		expect(onChange).toBeCalled();
		expect(wrapper.find('input').prop('value')).toEqual('foo');
	});

	it('should not trigger onChange if value is not changed', () => {
		const onChange = jest.fn();
		const value = 'banane';
		const wrapper = mount(
			<DatalistWidget
				id="myWidget"
				required
				schema={schema}
				value={value}
				onChange={onChange}
				options={{ restricted: true }}
			/>,
		);
		const input = wrapper.find('input').at(0);

		// when
		input.simulate('blur', { target: { value } });

		// then
		expect(onChange).not.toBeCalled();
	});

	it('should display labels when available', () => {
		const options = {
			enumOptions: [
				{
					value: 'key1',
					label: 'Label A',
				},
				{
					value: 'key2',
					label: 'Label B',
				},
			],
		};
		const wrapper = mount(<DatalistWidget id="myWidget" required options={options} />);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('focus'); // to display suggestions

		// then
		expect(
			wrapper
				.find('li')
				.at(0)
				.text(),
		).toBe('Label A');
		expect(
			wrapper
				.find('li')
				.at(1)
				.text(),
		).toBe('Label B');
	});

	it('should return keys if in value/label mode', () => {
		const onChange = jest.fn();
		const options = {
			enumOptions: [
				{
					value: 'key1',
					label: 'Label A',
				},
			],
		};
		const wrapper = mount(
			<DatalistWidget id="myWidget" required options={options} onChange={onChange} />,
		);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('focus'); // to display suggestions
		wrapper
			.find('li')
			.at(0)
			.simulate('mouseDown');

		// then
		expect(onChange).toBeCalledWith('key1');
	});

	const options = {
		enumOptions: [
			{ value: 'apple', label: { label: 'Apple', category: 'fruit' } },
			{ value: 'blue', label: { label: 'Blue', category: 'color' } },
		],
		groupBy: 'category',
	};

	it('should render items under category when it has "category" property', () => {
		// given
		const wrapper = mount(<DatalistWidget id="datawidget" options={options} />);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('focus');

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should select item under category when press enter on focused item', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(<DatalistWidget id="datawidget" options={options} onChange={onChange} />);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('focus');
		const event = new KeyboardEvent('keydown', { keyCode: 37 });
		document.dispatchEvent(event);
		wrapper
			.find('li')
			.at(0)
			.simulate('mouseDown');

		// then
		expect(onChange).toBeCalledWith('apple');

		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
