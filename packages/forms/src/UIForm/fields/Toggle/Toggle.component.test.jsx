import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Toggle from './Toggle.component';

vi.unmock('@talend/design-system');

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
				onChange={vi.fn()}
				onFinish={vi.fn()}
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
				onChange={vi.fn()}
				onFinish={vi.fn()}
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
				onChange={vi.fn()}
				onFinish={vi.fn()}
				schema={disabledSchema}
				value
			/>,
		);

		// then
		expect(screen.getByRole('checkbox')).toBeDisabled();
	});

	it('should trigger onChange and onFinish', async () => {
		// given
		const onChange = vi.fn();
		const onFinish = vi.fn();
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
