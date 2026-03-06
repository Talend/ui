import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TextArea from './TextArea.component';

vi.unmock('@talend/design-system');

describe('TextArea field', () => {
	const schema = {
		autoFocus: true,
		description: 'my text input hint',
		key: ['user', 'comment'],
		placeholder: 'Type something here',
		required: true,
		title: 'My input title',
		type: 'text',
	};

	it('should render textarea', () => {
		// when
		const { container } = render(
			<TextArea
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={vi.fn()}
				onFinish={vi.fn()}
				schema={schema}
				value="toto"
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render disabled textarea', () => {
		// given
		const disabledSchema = {
			...schema,
			disabled: true,
		};

		// when
		render(
			<TextArea
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={vi.fn()}
				onFinish={vi.fn()}
				schema={disabledSchema}
				value="toto"
			/>,
		);

		// then
		expect(screen.getByRole('textbox')).toBeDisabled();
	});

	it('should render readonly textarea', () => {
		// given
		const readOnlySchema = {
			...schema,
			readOnly: true,
		};

		// when
		render(
			<TextArea
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={vi.fn()}
				onFinish={vi.fn()}
				schema={readOnlySchema}
				value="toto"
			/>,
		);

		// then
		expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
	});

	it('should render provided rows', () => {
		// given
		const schemaWithRows = {
			...schema,
			rows: 10,
		};

		// when
		render(
			<TextArea
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={vi.fn()}
				onFinish={vi.fn()}
				schema={schemaWithRows}
				value="toto"
			/>,
		);

		// then
		expect(screen.getByRole('textbox')).toHaveAttribute('rows', '10');
	});

	it('should trigger onChange', async () => {
		// given
		const onChange = vi.fn();
		render(
			<TextArea
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={onChange}
				onFinish={vi.fn()}
				schema={schema}
				value="toto"
			/>,
		);
		const value = 'totoa';
		const event = { target: { value } };

		// when
		await userEvent.type(screen.getByRole('textbox'), value);

		// then
		expect(onChange).toHaveBeenCalledWith(expect.anything(event), { schema, value });
	});

	it('should trigger onFinish on input blur', async () => {
		// given
		const onFinish = vi.fn();
		render(
			<TextArea
				id="myForm"
				isValid
				errorMessage="My error message"
				onChange={vi.fn()}
				onFinish={onFinish}
				schema={schema}
				value="toto"
			/>,
		);
		const value = 'totoa';
		const event = { target: { value } };

		// when
		await userEvent.type(screen.getByRole('textbox'), value);
		await userEvent.tab();

		// then
		expect(onFinish).toHaveBeenCalledWith(expect.anything(event), { schema });
	});
});
