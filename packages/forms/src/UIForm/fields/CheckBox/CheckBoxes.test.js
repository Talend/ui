import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CheckBoxes from './CheckBoxes.component';

jest.unmock('@talend/design-system');

describe('CheckBoxes field', () => {
	const schema = {
		description: 'my checkbox input hint',
		title: 'My checkboxes title',
		titleMap: [
			{ name: 'My foo title', value: 'foo' },
			{ name: 'My bar title', value: 'bar' },
			{ name: 'My lol title', value: 'lol' },
		],
		type: 'checkbox',
	};

	it('should render checkboxes', () => {
		// given
		const value = ['foo', 'bar'];

		// when
		const { container } = render(
			<CheckBoxes
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={schema}
				value={value}
			/>,
		);

		// then
		expect(screen.getAllByRole('checkbox')).toHaveLength(3);
		expect(screen.getByRole('checkbox', { name: 'My foo title' })).toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'My bar title' })).toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'My lol title' })).not.toBeChecked();
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render checkboxes with no values', () => {
		// when
		render(
			<CheckBoxes
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={schema}
			/>,
		);

		// then
		expect(screen.getAllByRole('checkbox')).toHaveLength(3);
		expect(screen.getByRole('checkbox', { name: 'My foo title' })).not.toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'My bar title' })).not.toBeChecked();
		expect(screen.getByRole('checkbox', { name: 'My lol title' })).not.toBeChecked();
	});

	it('should render disabled checkboxes', () => {
		// given
		const disabledSchema = {
			...schema,
			disabled: true,
		};

		// when
		render(
			<CheckBoxes
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={disabledSchema}
			/>,
		);

		// then
		expect(screen.getAllByRole('checkbox')).toHaveLength(3);
		expect(screen.getByRole('checkbox', { name: 'My foo title' })).toBeDisabled();
		expect(screen.getByRole('checkbox', { name: 'My bar title' })).toBeDisabled();
		expect(screen.getByRole('checkbox', { name: 'My lol title' })).toBeDisabled();
	});

	describe('#onChange', () => {
		it('should trigger callback, adding a value to existing values', async () => {
			// given
			const values = ['foo', 'bar'];
			const onChange = jest.fn();
			render(
				<CheckBoxes
					id="myForm"
					isValid
					errorMessage="My error message"
					onChange={onChange}
					onFinish={jest.fn()}
					schema={schema}
					value={values}
				/>,
			);

			// when
			await userEvent.click(screen.getByRole('checkbox', { name: 'My lol title' }));

			// then
			expect(onChange).toBeCalledWith(expect.anything({ type: 'click' }), {
				schema,
				value: ['foo', 'bar', 'lol'],
			});
		});

		it('should trigger callback, adding a value to undefined values', async () => {
			// given
			const onChange = jest.fn();
			render(
				<CheckBoxes
					id="myForm"
					isValid
					errorMessage="My error message"
					onChange={onChange}
					onFinish={jest.fn()}
					schema={schema}
				/>,
			);

			// when
			await userEvent.click(screen.getByRole('checkbox', { name: 'My lol title' }));

			// then
			expect(onChange).toBeCalledWith(expect.anything(), { schema, value: ['lol'] });
		});

		it('should trigger callback, removing a value to existing multi values', async () => {
			// given
			const values = ['foo', 'bar'];
			const onChange = jest.fn();
			render(
				<CheckBoxes
					id="myForm"
					isValid
					errorMessage="My error message"
					onChange={onChange}
					onFinish={jest.fn()}
					schema={schema}
					value={values}
				/>,
			);

			// when
			await userEvent.click(screen.getByRole('checkbox', { name: 'My foo title' }));

			// then
			expect(onChange).toBeCalledWith(expect.anything({ type: 'click' }), {
				schema,
				value: ['bar'],
			});
		});

		it('should trigger callback, removing a value to existing single value', async () => {
			// given
			const values = ['foo'];
			const onChange = jest.fn();
			render(
				<CheckBoxes
					id="myForm"
					isValid
					errorMessage="My error message"
					onChange={onChange}
					onFinish={jest.fn()}
					schema={schema}
					value={values}
				/>,
			);

			// when
			await userEvent.click(screen.getByRole('checkbox', { name: 'My foo title' }));

			// then
			expect(onChange).toBeCalledWith(expect.anything({ type: 'click' }), {
				schema,
				value: undefined,
			});
		});
	});

	it('should trigger onFinish on checkbox change', async () => {
		// given
		const values = ['foo', 'bar'];
		const onFinish = jest.fn();
		render(
			<CheckBoxes
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={jest.fn()}
				onFinish={onFinish}
				schema={schema}
				value={values}
			/>,
		);
		// const event = { target: { checked: true } };

		// when
		await userEvent.click(screen.getByRole('checkbox', { name: 'My lol title' }));

		// then
		expect(onFinish).toBeCalledWith(expect.anything(), { schema, value: ['foo', 'bar', 'lol'] });
	});
});
