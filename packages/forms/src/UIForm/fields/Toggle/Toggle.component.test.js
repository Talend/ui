import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Toggle from './Toggle.component';

jest.unmock('@talend/design-system');

describe('Toggle field', () => {
	const schema = {
		description: 'my text input hint',
		required: true,
		title: 'My input title',
		type: 'text',
	};

	it('should render input', () => {
		// when
		const { container } = render(
			<Toggle
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={schema}
				value
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render autoFocused input', () => {
		// given
		const autoFocusedSchema = {
			...schema,
			autoFocus: true,
		};

		// when
		render(
			<Toggle
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={autoFocusedSchema}
				value
			/>,
		);

		// then
		expect(screen.getByRole('checkbox')).toHaveFocus();
	});

	it('should render disabled input', () => {
		// given
		const disabledSchema = {
			...schema,
			disabled: true,
		};

		// when
		render(
			<Toggle
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={disabledSchema}
				value
			/>,
		);

		// then
		expect(screen.getByRole('checkbox')).toBeDisabled();
	});

	it('should trigger onChange and onFinish', async () => {
		// given
		const onChange = jest.fn();
		const onFinish = jest.fn();
		render(
			<Toggle
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={onChange}
				onFinish={onFinish}
				schema={schema}
				value
			/>,
		);

		// when
		await userEvent.click(screen.getByRole('checkbox'));

		// then
		expect(onChange).toHaveBeenCalledWith(expect.anything(), { schema, value: false });
		expect(onFinish).toHaveBeenCalledWith(expect.anything(), { schema, value: false });
	});
});
