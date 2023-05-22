import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CheckBox from './CheckBox.component';

jest.unmock('@talend/design-system');

describe('CheckBox field', () => {
	const schema = {
		autoFocus: true,
		description: 'my checkbox input hint',
		title: 'My checkbox title',
		type: 'checkbox',
	};

	it('should render input', () => {
		// when
		const { container } = render(
			<CheckBox
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

	it('should render disabled input', () => {
		// given
		const disabledSchema = {
			...schema,
			disabled: true,
		};

		// when
		render(
			<CheckBox
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

	it('should trigger onChange and onFinish on click', () => {
		// given
		const onChange = jest.fn();
		const onFinish = jest.fn();
		render(
			<CheckBox
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
		userEvent.click(screen.getByRole('checkbox'));

		// then
		expect(onChange).toBeCalledWith(expect.anything({ type: 'click' }), { schema, value: false });
		expect(onFinish).toBeCalledWith(expect.anything({ type: 'click' }), { schema, value: false });
	});
});
