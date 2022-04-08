import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DatalistWidget, { escapeRegexCharacters } from './DatalistWidget';

const getByTextContent = text =>
	screen.getByText((content, element) => content !== '' && element.textContent === text);
const queryByTextContent = text =>
	screen.queryByText((content, element) => content !== '' && element.textContent === text);

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
		const suggestions = [
			{ value: 'aze', label: 'aze' },
			{ value: 'banane', label: 'banane' },
			{ value: 'bananAze', label: 'bananAze' },
			{ value: '   AzErTy   ', label: '   AzErTy   ' },
			{ value: 'Toto', label: 'Toto' },
		];
		render(
			<DatalistWidget
				onChange={jest.fn()}
				schema={{ title: 'Fruits', enum: suggestions.map(({ value }) => value) }}
			/>,
		);

		// when
		userEvent.type(screen.getByRole('textbox'), 'aze');

		// then
		expect(getByTextContent('aze')).toBeInTheDocument();
		expect(getByTextContent('bananAze')).toBeInTheDocument();
		expect(getByTextContent('   AzErTy   ')).toBeInTheDocument();
		expect(queryByTextContent('babane')).not.toBeInTheDocument();
		expect(queryByTextContent('Toto')).not.toBeInTheDocument();
	});

	it('should filter with special chars', () => {
		// given
		const suggestions = [
			{ value: 'aze', label: 'aze' },
			{ value: 'banane', label: 'banane' },
			{ value: 'bananaz[e', label: 'bananaz[e' },
			{ value: '   az[erty   ', label: '   az[erty   ' },
		];
		render(
			<DatalistWidget
				onChange={jest.fn()}
				schema={{ title: 'Fruits', enum: suggestions.map(({ value }) => value) }}
			/>,
		);

		// when
		userEvent.type(screen.getByRole('textbox'), 'az[[e'); // double the bracket because it's a special char for userEvent

		// then
		expect(getByTextContent('bananaz[e')).toBeInTheDocument();
		expect(getByTextContent('   az[erty   ')).toBeInTheDocument();
		expect(queryByTextContent('aze')).not.toBeInTheDocument();
		expect(queryByTextContent('babane')).not.toBeInTheDocument();
	});
});

describe('DatalistWidget', () => {
	const schema = {
		title: 'Fruits',
		enum: ['aze', 'banane', 'bananAze', '   AzErTy   ', 'Toto'],
	};

	beforeAll(() => {
		jest.useFakeTimers();
	});

	afterAll(() => {
		jest.runAllTimers();
		jest.useRealTimers();
	});

	it('should render input', () => {
		// when
		render(<DatalistWidget id="myWidget" required schema={schema} onChange={jest.fn()} />);

		// then
		expect(screen.getByRole('textbox')).toBeInTheDocument();
	});

	it('should render "no match" message', () => {
		// given
		render(<DatalistWidget id="myWidget" required schema={schema} onChange={jest.fn()} />);

		// when
		userEvent.type(screen.getByRole('textbox'), 'noMatchingValue');

		// then
		expect(screen.getByText('No match.')).toBeInTheDocument();
	});

	it('should render "empty list" message', () => {
		// given
		render(
			<DatalistWidget
				id="myWidget"
				required
				schema={{ title: 'Fruits', enum: [] }}
				onChange={jest.fn()}
				renderEmptyList={() => 'Empty list'}
			/>,
		);

		// when
		userEvent.click(screen.getByRole('textbox'));

		// then
		expect(screen.getByText('Empty list')).toBeInTheDocument();
	});

	it('should render all suggestions on focus', () => {
		// given
		render(<DatalistWidget id="myWidget" required schema={schema} onChange={jest.fn()} />);

		// when
		userEvent.click(screen.getByRole('textbox'));

		// then
		expect(screen.getByText('aze')).toBeInTheDocument();
		expect(screen.getByText('banane')).toBeInTheDocument();
		expect(screen.getByText('bananAze')).toBeInTheDocument();
		expect(screen.getByText('AzErTy')).toBeInTheDocument();
		expect(screen.getByText('Toto')).toBeInTheDocument();
	});

	it('should render highlighted matching suggestions on value change', () => {
		// given
		render(<DatalistWidget id="myWidget" required schema={schema} onChange={jest.fn()} />);

		// when
		userEvent.type(screen.getByRole('textbox'), 'aze');

		// then
		expect(getByTextContent('aze')).toBeInTheDocument();
		expect(getByTextContent('bananAze')).toBeInTheDocument();
		expect(screen.getByText('Aze')).toBeInTheDocument(); // highlighted element from "bananAze"
		expect(getByTextContent('   AzErTy   ')).toBeInTheDocument();
		expect(screen.getByText('AzE')).toBeInTheDocument(); // highlighted element from "   AzErTy   "
		expect(queryByTextContent('babane')).not.toBeInTheDocument();
		expect(queryByTextContent('Toto')).not.toBeInTheDocument();
	});

	it('should set value and reset suggestions on suggestion selection', () => {
		// given
		const onChange = jest.fn();
		render(<DatalistWidget id="myWidget" required schema={schema} onChange={onChange} />);

		// when
		userEvent.click(screen.getByRole('textbox'));
		userEvent.click(screen.getByText('aze'));

		// then
		expect(onChange).toBeCalledWith('aze');
		expect(screen.getByRole('textbox')).toHaveValue('aze');
	});

	it('should set value when receiving a new value from props', () => {
		// given
		const onChange = jest.fn();
		const { rerender } = render(
			<DatalistWidget id="myWidget" required schema={schema} onChange={onChange} />,
		);

		// when
		rerender(
			<DatalistWidget id="myWidget" required schema={schema} onChange={onChange} value="new" />,
		);

		// then
		expect(screen.getByRole('textbox')).toHaveValue('new');
	});

	it('should not change the value if it is the same', () => {
		// given
		const onChange = jest.fn();
		render(
			<DatalistWidget id="myWidget" value="aze" required schema={schema} onChange={onChange} />,
		);

		// when
		userEvent.click(screen.getByRole('textbox'));
		userEvent.click(screen.getByText('aze'));

		// then
		expect(onChange).not.toBeCalled();
	});

	it('should reset value on unknown value input blur', () => {
		// given
		const schema2 = {
			title: 'Fruits',
			enum: ['aze', 'banane', 'bananAze', '   AzErTy   ', 'Toto'],
		};
		render(
			<DatalistWidget
				id="myWidget"
				required
				schema={schema2}
				onChange={jest.fn()}
				options={{ restricted: true }}
			/>,
		);

		// when
		userEvent.type(screen.getByRole('textbox'), 'unknown');
		jest.runAllTimers(); // userEvent.type manages the focus too. The focus management is done with a setTimeout
		fireEvent.blur(screen.getByRole('textbox'));

		// then
		expect(screen.getByRole('textbox')).toHaveValue('');
	});

	it('should select known value on input blur', () => {
		// given
		const onChange = jest.fn();
		render(
			<DatalistWidget
				id="myWidget"
				required
				schema={schema}
				onChange={onChange}
				options={{ restricted: true }}
			/>,
		);
		const input = screen.getByRole('textbox');

		// when
		userEvent.click(input);
		jest.runAllTimers(); // focus management via setTimeout
		userEvent.type(input, 'banane');
		fireEvent.blur(input);

		// then
		expect(onChange).toBeCalledWith('banane');
		expect(input).toHaveValue('banane');
	});

	it('should select known value on input blur with enumOptions', () => {
		// given
		const onChange = jest.fn();
		render(
			<DatalistWidget
				id="myWidget"
				required
				schema={schema}
				onChange={onChange}
				options={{ enumOptions: [{ label: 'foo', value: 'bar' }], restricted: true }}
			/>,
		);
		const input = screen.getByRole('textbox');

		// when
		userEvent.click(input);
		jest.runAllTimers(); // focus management via setTimeout
		userEvent.type(input, 'bar');
		fireEvent.blur(input);

		// then
		expect(onChange).toBeCalled();
		expect(input).toHaveValue('foo');
	});

	it('should not trigger onChange on blur if value has not changed', () => {
		// given
		const onChange = jest.fn();
		render(
			<DatalistWidget
				id="myWidget"
				required
				schema={schema}
				value="banane"
				onChange={onChange}
				options={{ restricted: true }}
			/>,
		);

		// when
		fireEvent.blur(screen.getByRole('textbox'));

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
		render(
			<DatalistWidget
				id="myWidget"
				required
				options={options}
				onChange={jest.fn()}
				schema={{ title: 'Fruits', enum: [] }}
			/>,
		);

		// when
		userEvent.click(screen.getByRole('textbox'));

		// then
		expect(screen.getByText('Label A')).toBeInTheDocument();
		expect(screen.getByText('Label B')).toBeInTheDocument();
	});

	it('should return corresponding value on title selection in titleMap', () => {
		const onChange = jest.fn();
		const options = {
			enumOptions: [
				{
					value: 'key1',
					label: 'Label A',
				},
			],
		};
		render(
			<DatalistWidget
				id="myWidget"
				required
				options={options}
				onChange={onChange}
				schema={{ title: 'Fruits', enum: ['key1'] }}
			/>,
		);

		// when
		userEvent.click(screen.getByRole('textbox'));
		userEvent.click(screen.getByText('Label A'));

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
		render(
			<DatalistWidget
				id="datawidget"
				options={options}
				onChange={jest.fn()}
				schema={{ title: 'Fruits', enum: [] }}
			/>,
		);

		// when
		userEvent.click(screen.getByRole('textbox'));

		// then
		expect(screen.getByText('fruit')).toBeInTheDocument();
		expect(screen.getByText('color')).toBeInTheDocument();
	});

	it('should select item under category when press enter on focused item', () => {
		// given
		const onChange = jest.fn();
		render(
			<DatalistWidget
				id="datawidget"
				options={options}
				onChange={onChange}
				schema={{ title: 'Fruits', enum: [] }}
			/>,
		);
		const input = screen.getByRole('textbox');

		// when
		userEvent.click(input);
		jest.runAllTimers(); // focus management via setTimeout
		userEvent.type(input, '{arrowdown}{enter}');

		// then
		expect(onChange).toBeCalledWith('apple');
		expect(input).toHaveValue('Apple');
	});
});
