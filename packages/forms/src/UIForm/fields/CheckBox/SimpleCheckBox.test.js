import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SimpleCheckBox from './SimpleCheckBox.component';

jest.unmock('@talend/design-system');

describe('SimpleCheckBox field', () => {
	const schema = {
		autoFocus: true,
		disabled: false,
		required: true,
	};

	it('should render input', () => {
		// when
		const { container } = render(
			<SimpleCheckBox
				describedby="myForm-description myForm-error"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				id="myForm"
				label="My checkbox custom label"
				schema={schema}
				value
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render disabled input', () => {
		// given
		const disabledSchema = {
			...schema,
			disabled: true,
		};

		// when
		render(
			<SimpleCheckBox
				describedby="myForm-description myForm-error"
				onChange={jest.fn()}
				onFinish={jest.fn()}
				id="myForm"
				label="My checkbox custom label"
				schema={disabledSchema}
				value
			/>,
		);

		// then
		expect(screen.getByRole('checkbox')).toBeDisabled();
	});

	it('should trigger onChange', async () => {
		// given
		const onChange = jest.fn();
		const onFinish = jest.fn();
		render(
			<SimpleCheckBox
				id="myForm"
				describedby="myForm-description myForm-error"
				label="My checkbox custom label"
				onChange={onChange}
				onFinish={onFinish}
				schema={schema}
				value
			/>,
		);

		// when
		await userEvent.click(screen.getByRole('checkbox'));

		// then
		expect(onChange).toBeCalledWith(expect.anything({ type: 'click' }), { schema, value: false });
	});

	it('should trigger onFinish on checkbox change', async () => {
		// given
		const onChange = jest.fn();
		const onFinish = jest.fn();
		render(
			<SimpleCheckBox
				describedby="myForm-description myForm-error"
				id="myForm"
				label="My checkbox custom label"
				onChange={onChange}
				onFinish={onFinish}
				schema={schema}
				value
			/>,
		);

		// when
		await userEvent.click(screen.getByRole('checkbox'));

		// then
		expect(onFinish).toBeCalledWith(expect.anything(), { schema, value: false });
	});

	describe('data-feature', () => {
		const dataFeature = 'my.custom.feature';

		it('should render checkbox with check data-feature when checkbox is unchecked', () => {
			render(
				<SimpleCheckBox
					describedby="myForm-description myForm-error"
					onChange={jest.fn()}
					onFinish={jest.fn()}
					id="myForm"
					label="My checkbox custom label"
					schema={{
						...schema,
						'data-feature': dataFeature,
					}}
				/>,
			);
			expect(
				document.querySelector(`label[data-feature="${dataFeature}.check"]`),
			).toBeInTheDocument();
		});

		it('should render checkbox with uncheck data-feature when checkbox is checked', () => {
			render(
				<SimpleCheckBox
					describedby="myForm-description myForm-error"
					onChange={jest.fn()}
					onFinish={jest.fn()}
					id="myForm"
					label="My checkbox custom label"
					schema={{
						...schema,
						'data-feature': dataFeature,
					}}
					value
				/>,
			);
			expect(
				document.querySelector(`label[data-feature="${dataFeature}.uncheck"]`),
			).toBeInTheDocument();
		});
	});
});
