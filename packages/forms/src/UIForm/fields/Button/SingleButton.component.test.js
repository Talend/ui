import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SingleButton from './SingleButton.component';

jest.unmock('@talend/design-system');

describe('SingleButton field', () => {
	const schema = {
		bsStyle: 'primary',
		name: 'my-button',
		title: 'Boom !',
	};

	it('should render button', () => {
		// when
		const { container } = render(<SingleButton id="myForm" schema={schema} />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render submit button', () => {
		// given
		const submitSchema = {
			...schema,
			type: 'submit',
		};

		// when
		render(<SingleButton id="myForm" schema={submitSchema} />);

		// then
		expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
	});

	it('should render submit button with inProgress', () => {
		// given
		const submitSchema = {
			...schema,
			inProgress: true,
			type: 'submit',
		};

		// when
		render(<SingleButton id="myForm" schema={submitSchema} />);

		// then
		expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
		expect(screen.getByRole('button').firstChild).toHaveAttribute('aria-busy', 'true');
	});

	it('should render reset button', () => {
		// given
		const resetSchema = {
			...schema,
			type: 'reset',
		};

		// when
		render(<SingleButton id="myForm" schema={resetSchema} />);

		// then
		expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
	});

	it('should render disabled button', () => {
		// given
		const disabledSchema = {
			...schema,
			disabled: true,
		};

		// when
		render(<SingleButton id="myForm" schema={disabledSchema} />);

		// then
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('should call trigger on button click', async () => {
		// given
		const triggerSchema = {
			...schema,
			triggers: ['after'],
		};
		const onTrigger = jest.fn(() => Promise.resolve());
		render(<SingleButton id="myForm" onTrigger={onTrigger} schema={triggerSchema} />);

		// when
		await userEvent.click(screen.getByRole('button'));

		// then
		expect(onTrigger).toHaveBeenCalledWith(expect.anything({ type: 'click' }), {
			trigger: triggerSchema.triggers[0],
			schema: triggerSchema,
		});
	});
});
