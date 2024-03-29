import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Datalist from './Datalist.component';

const props = {
	disabled: false,
	placeholder: 'Type here',
	noResultText: 'there is nothing ...',
	readOnly: false,
	title: 'My List',
	titleMap: [
		{ name: 'My foo', value: 'foo', description: 'foo description' },
		{ name: 'My bar', value: 'bar' },
		{ name: 'My foobar', value: 'foobar', description: 'foobar description' },
		{ name: 'My mdr', value: 'lol' },
	],
};

const multiSectionMap = [
	{
		title: 'cat 1',
		suggestions: [{ name: 'My foo', value: 'foo', description: 'foo description' }],
	},
	{ title: 'cat 2', suggestions: [{ name: 'My bar', value: 'bar' }] },
	{
		title: 'cat 3',
		suggestions: [{ name: 'My foobar', value: 'foobar', description: 'foobar description' }],
	},
	{ title: 'cat 4', suggestions: [{ name: 'My lol', value: 'lol' }] },
];

jest.unmock('@talend/design-system');

describe('Datalist component', () => {
	it('should render a input', () => {
		// when
		render(<Datalist id="my-datalist" onChange={jest.fn()} {...props} />);

		// then
		expect(screen.getByRole('textbox')).toBeInTheDocument();
	});

	it('should show all suggestions on focus (even with a value)', async () => {
		const user = userEvent.setup();

		// given
		render(<Datalist id="my-datalist" isValid onChange={jest.fn()} {...props} value="foo" />);

		// when
		await user.click(screen.getByRole('textbox'));

		// then
		// container.getElementsByClassName('');
		expect(screen.getByTitle('My foo')).toBeInTheDocument();
		expect(screen.getByTitle('My foobar')).toBeInTheDocument();
		expect(screen.getByTitle('My bar')).toBeInTheDocument();
		expect(screen.getByTitle('My mdr')).toBeInTheDocument();
	});

	it('should show all suggestions on down press (even with a value)', async () => {
		const user = userEvent.setup();

		// given
		render(<Datalist id="my-datalist" isValid onChange={jest.fn()} {...props} value="foo" />);

		// when
		await user.type(screen.getByRole('textbox'), '{Down}');

		// then
		// container.getElementsByClassName('');
		expect(screen.getByTitle('My foo')).toBeInTheDocument();
		expect(screen.getByTitle('My foobar')).toBeInTheDocument();
		expect(screen.getByTitle('My bar')).toBeInTheDocument();
		expect(screen.getByTitle('My mdr')).toBeInTheDocument();
	});

	it('should show all suggestions on up press (even with a value)', async () => {
		const user = userEvent.setup();

		// given
		render(<Datalist id="my-datalist" isValid onChange={jest.fn()} {...props} value="foo" />);

		// when
		await user.type(screen.getByRole('textbox'), '{Up}');

		// then
		// container.getElementsByClassName('');
		expect(screen.getByTitle('My foo')).toBeInTheDocument();
		expect(screen.getByTitle('My foobar')).toBeInTheDocument();
		expect(screen.getByTitle('My bar')).toBeInTheDocument();
		expect(screen.getByTitle('My mdr')).toBeInTheDocument();
	});

	it('should show suggestions that match filter', async () => {
		const user = userEvent.setup();

		// given
		render(<Datalist id="my-datalist" isValid onChange={jest.fn()} {...props} />);

		// when
		const textbox = screen.getByRole('textbox');
		await user.type(textbox, 'foo');

		// then
		// container.getElementsByClassName('');
		expect(screen.getByTitle('My foo')).toBeInTheDocument();
		expect(screen.getByTitle('My foobar')).toBeInTheDocument();
		expect(screen.queryByTitle('My bar')).not.toBeInTheDocument();
		expect(screen.queryByTitle('My mdr')).not.toBeInTheDocument();
	});

	it('should show suggestions in group that match filter', async () => {
		const user = userEvent.setup();

		// given
		const multiSectionProps = { ...props, titleMap: multiSectionMap };
		render(<Datalist id="my-datalist" multiSection onChange={jest.fn()} {...multiSectionProps} />);

		// when
		const textbox = screen.getByRole('textbox');
		await user.type(textbox, 'foo');

		// then
		expect(screen.getByTitle('My foo')).toBeInTheDocument();
		expect(screen.getByTitle('My foobar')).toBeInTheDocument();
		expect(screen.queryByTitle('My bar')).not.toBeInTheDocument();
		expect(screen.queryByTitle('My lol')).not.toBeInTheDocument();
	});

	it('should call callback on focus event', async () => {
		const user = userEvent.setup();

		// given
		const onFocus = jest.fn();
		render(<Datalist id="my-datalist" onChange={jest.fn()} onFocus={onFocus} {...props} />);
		const input = screen.getByRole('textbox');
		expect(onFocus).not.toHaveBeenCalled();

		// when
		await user.click(input);

		// then
		expect(onFocus).toHaveBeenCalled();
	});

	it('should call callback on input live change', async () => {
		const user = userEvent.setup();

		// given
		const onLiveChange = jest.fn();
		render(
			<Datalist id="my-datalist" onChange={jest.fn()} onLiveChange={onLiveChange} {...props} />,
		);
		const input = screen.getByRole('textbox');

		// when
		await user.type(input, 'lo');

		// then
		expect(onLiveChange).toHaveBeenCalledWith(expect.anything(), 'lo');
	});

	it('should call callback on blur', async () => {
		// given
		const onBlur = jest.fn();
		render(<Datalist id="my-datalist" onChange={jest.fn()} onBlur={onBlur} {...props} />);
		const input = screen.getByRole('textbox');

		// when
		fireEvent.blur(input);

		// then
		await waitFor(() => expect(onBlur).toHaveBeenCalled());
	});

	it('should close suggestions on blur', async () => {
		const user = userEvent.setup();

		// given
		render(<Datalist id="my-datalist" onChange={jest.fn()} {...props} />);
		const input = screen.getByRole('textbox');
		await user.click(input);

		expect(screen.getByRole('listbox')).toBeInTheDocument();

		// when
		fireEvent.blur(input);

		// then
		await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
	});

	it('should close suggestions on enter', async () => {
		const user = userEvent.setup();

		// given
		render(<Datalist id="my-datalist" onChange={jest.fn()} {...props} />);
		const input = screen.getByRole('textbox');
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

		await user.click(input);
		expect(screen.getByRole('listbox')).toBeInTheDocument();

		// when
		await user.type(input, '{Enter}');

		// then
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
	});

	it('should close suggestions on esc', async () => {
		const user = userEvent.setup();

		// given
		render(<Datalist id="my-datalist" onChange={jest.fn()} {...props} />);
		const input = screen.getByRole('textbox');
		await user.click(input);

		expect(screen.getByRole('listbox')).toBeInTheDocument();

		// when
		await user.type(input, '{Esc}');

		// then
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
	});

	it('should clear input', async () => {
		const user = userEvent.setup();

		// given
		const onChange = jest.fn();
		render(<Datalist id="my-datalist" onChange={onChange} {...props} value="foo" />);

		// when
		const input = screen.getByRole('textbox');
		await user.clear(input);
		fireEvent.blur(input);

		// then
		await waitFor(() => expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: '' }));
	});

	it('should reset previous value on ESC keydown', async () => {
		const user = userEvent.setup();

		// given
		const onChange = jest.fn();
		render(<Datalist id="my-datalist" onChange={onChange} {...props} value="foo" />);

		// when
		const input = screen.getByRole('textbox');
		await user.type(input, 'whatever{Esc}');

		// then
		expect(onChange).not.toHaveBeenCalled();
		expect(input).toHaveValue('My foo');
	});

	it('should set value on props value update', () => {
		// given
		const onChange = jest.fn();
		const { rerender } = render(
			<Datalist id="my-datalist" onChange={onChange} {...props} value="foo" />,
		);
		expect(screen.getByRole('textbox')).toHaveValue('My foo');

		// when
		rerender(<Datalist id="my-datalist" onChange={onChange} {...props} value="bar" />);

		// then
		expect(screen.getByRole('textbox')).toHaveValue('My bar');
	});

	it('should set value on props titleMap update', () => {
		// given
		const onChange = jest.fn();
		const { rerender } = render(
			<Datalist id="my-datalist" onChange={onChange} {...props} value="foo" />,
		);
		expect(screen.getByRole('textbox')).toHaveValue('My foo');

		// when
		const propsNewTitlemap = {
			...props,
			titleMap: [{ name: 'My foo updated', value: 'foo', description: 'foo description' }],
		};
		rerender(<Datalist id="my-datalist" onChange={onChange} {...propsNewTitlemap} value="foo" />);

		// then
		expect(screen.getByRole('textbox')).toHaveValue('My foo updated');
	});

	it('should keep filter when titleMap is updated', async () => {
		const user = userEvent.setup();

		// given
		const testProps = {
			id: 'my-datalist',
			value: 'foo',
			onChange: jest.fn(),
			...props,
		};
		const { rerender } = render(<Datalist {...testProps} />);

		// when
		await user.type(screen.getByRole('textbox'), 'a');
		rerender(<Datalist {...testProps} titleMap={[...props.titleMap]} />);

		// then
		expect(screen.getByRole('textbox')).toHaveValue('a');
	});

	it('should keep filter when titleMap is updated and value is empty', async () => {
		const user = userEvent.setup();

		// given
		const testProps = {
			id: 'my-datalist',
			value: '',
			onChange: jest.fn(),
			...props,
		};
		const { rerender } = render(<Datalist {...testProps} />);

		// when
		await user.type(screen.getByRole('textbox'), 'a');
		rerender(<Datalist {...testProps} titleMap={[...props.titleMap]} />);

		// then
		expect(screen.getByRole('textbox')).toHaveValue('a');
	});

	it('should update entry if value or name in new entry are not the same as in selected entry', () => {
		// given
		const testProps = {
			id: 'my-datalist',
			value: 'foo',
			onChange: jest.fn(),
			...props,
		};

		// when
		const { rerender } = render(<Datalist {...testProps} />);

		// then
		expect(screen.getByRole('textbox')).toHaveValue('My foo');

		const newTitleMap = [
			{ name: 'Entry one', value: 'entry_one' },
			{ name: 'Entry two', value: 'entry_two' },
			{ name: 'Entry three', value: 'entry_three' },
		];

		// when data list is rendered with new title map and value from old title map
		rerender(<Datalist {...testProps} titleMap={newTitleMap} />);

		// then filter value is entry value from old title map
		expect(screen.getByRole('textbox')).toHaveValue(testProps.value);

		// when data list is rendered one more time with value from new title map
		rerender(<Datalist {...testProps} titleMap={newTitleMap} value={newTitleMap[0].value} />);

		// then entry is updated and filter value is new entry name
		expect(screen.getByRole('textbox')).toHaveValue(newTitleMap[0].name);
	});

	it('should set highlight on current value suggestion', async () => {
		const user = userEvent.setup();

		// given
		render(<Datalist id="my-datalist" onChange={jest.fn()} {...props} value="foo" />);
		const input = screen.getByRole('textbox');

		// when
		await user.click(input);

		// then
		expect(screen.getByTitle('My foo')).toHaveClass('theme-selected');
		expect(screen.getByTitle('My foobar')).not.toHaveClass('theme-selected');
		// expect(screen.getByTitle('My foo')).toHaveStyle('background: rgba(6, 117, 193, 0.2);');
	});

	describe('non restricted mode (default)', () => {
		it('should persist known value on blur', async () => {
			const user = userEvent.setup();

			// given
			const onChange = jest.fn();
			render(<Datalist id="my-datalist" onChange={onChange} {...props} />);
			expect(onChange).not.toHaveBeenCalled();

			// when
			const input = screen.getByRole('textbox');
			await user.type(input, 'foo');
			fireEvent.blur(input);

			// then
			await waitFor(() =>
				expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: 'foo' }),
			);
		});

		it('should persist unknown value on blur', async () => {
			const user = userEvent.setup();

			// given
			const onChange = jest.fn();
			render(<Datalist id="my-datalist" onChange={onChange} {...props} />);

			// when
			const input = screen.getByRole('textbox');
			await user.type(input, 'not a known value');
			fireEvent.blur(input);

			// then
			await waitFor(() =>
				expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: 'not a known value' }),
			);
		});

		it('should persist known value on enter', async () => {
			const user = userEvent.setup();

			// given
			const onChange = jest.fn();
			render(<Datalist id="my-datalist" onChange={onChange} {...props} />);
			expect(onChange).not.toHaveBeenCalled();

			// when
			const input = screen.getByRole('textbox');
			await user.type(input, 'foo{enter}');

			// then
			expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: 'foo' });
		});

		it('should persist unknown value on enter', async () => {
			const user = userEvent.setup();

			// given
			const onChange = jest.fn();
			render(<Datalist id="my-datalist" onChange={onChange} {...props} />);

			// when
			const input = screen.getByRole('textbox');
			await user.type(input, 'not a known value{enter}');

			// then
			expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: 'not a known value' });
		});
	});

	describe('allowAddNewElements mode', () => {
		it('should persist new value on blur', async () => {
			const user = userEvent.setup();

			// given
			const onChange = jest.fn();
			render(<Datalist id="my-datalist" allowAddNewElements onChange={onChange} {...props} />);
			expect(onChange).not.toHaveBeenCalled();
			const input = screen.getByRole('textbox');

			// when
			await user.type(input, 'not there');
			expect(screen.getByTitle('not there (new)')).toBeInTheDocument();
			fireEvent.blur(input);

			// then
			await waitFor(() =>
				expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: 'not there' }),
			);
		});
	});

	describe('restricted mode', () => {
		it('should persist known value on blur', async () => {
			const user = userEvent.setup();

			// given
			const onChange = jest.fn();
			render(<Datalist id="my-datalist" onChange={onChange} restricted {...props} />);
			expect(onChange).not.toHaveBeenCalled();
			const input = screen.getByRole('textbox');

			// when
			await user.type(input, 'foo');
			fireEvent.blur(input);

			// then
			await waitFor(() =>
				expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: 'foo' }),
			);
		});

		it('should reset unknown value on blur', async () => {
			const user = userEvent.setup();

			// given
			const onChange = jest.fn();
			render(<Datalist id="my-datalist" onChange={onChange} {...props} restricted value="foo" />);

			// when
			const input = screen.getByRole('textbox');
			await user.type(input, 'not a known value');
			fireEvent.blur(input);

			// then
			await Promise.all([
				waitFor(() => expect(onChange).not.toHaveBeenCalled()),
				waitFor(() => expect(input).toHaveValue('My foo')),
			]);
		});

		it('should persist known value on enter', async () => {
			const user = userEvent.setup();

			// given
			const onChange = jest.fn();
			render(<Datalist id="my-datalist" onChange={onChange} restricted {...props} />);
			expect(onChange).not.toHaveBeenCalled();

			// when
			const input = screen.getByRole('textbox');
			await user.type(input, 'foo{Enter}');

			// then
			await waitFor(() =>
				expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: 'foo' }),
			);
		});

		it('should reset unknown value on enter', async () => {
			const user = userEvent.setup();

			// given
			const onChange = jest.fn();
			render(<Datalist id="my-datalist" onChange={onChange} {...props} restricted value="foo" />);

			// when
			const input = screen.getByRole('textbox');
			await user.type(input, 'not a known value{Enter}');

			// then
			await Promise.all([
				waitFor(() => expect(onChange).not.toHaveBeenCalled()),
				waitFor(() => expect(input).toHaveValue('My foo')),
			]);
		});

		it('should persist empty value on enter', async () => {
			const user = userEvent.setup();

			// given
			const onChange = jest.fn();
			render(<Datalist id="my-datalist" value="foo" onChange={onChange} restricted {...props} />);
			expect(onChange).not.toHaveBeenCalled();

			// when
			const input = screen.getByRole('textbox');
			await user.clear(input);
			await user.type(input, '{Enter}');

			// then
			await waitFor(() => expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: '' }));
		});

		it('should persist empty value on blur', async () => {
			const user = userEvent.setup();

			// given
			const onChange = jest.fn();
			render(<Datalist id="my-datalist" value="foo" onChange={onChange} restricted {...props} />);
			expect(onChange).not.toHaveBeenCalled();

			// when
			const input = screen.getByRole('textbox');
			await user.clear(input);

			fireEvent.blur(input);

			// then
			await waitFor(() => expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: '' }));
		});
	});
});
