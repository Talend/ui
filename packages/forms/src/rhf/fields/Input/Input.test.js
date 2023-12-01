/* eslint-disable testing-library/no-unnecessary-act */
import { FormProvider, useForm } from 'react-hook-form';

import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from './RHFInput.component';

jest.unmock('@talend/design-system');

/* eslint-disable-next-line react/prop-types */
function FormWrapper({ children, onSubmit }) {
	const rhf = useForm({ mode: 'onChange' });
	return (
		<form onSubmit={rhf.handleSubmit(onSubmit)}>
			<FormProvider {...rhf}>
				{children}
				<button type="submit">Submit</button>
			</FormProvider>
		</form>
	);
}

describe('Input RHF widget', () => {
	it('should integrate with RHF', async () => {
		const user = userEvent.setup();

		// given
		const onSubmit = jest.fn();
		// when
		render(
			<FormWrapper onSubmit={onSubmit}>
				<Input type="text" id="name" name="name" label="name" defaultValue="12" />
			</FormWrapper>,
		);
		const input = screen.getByLabelText('name');

		await act(async () => {
			fireEvent.click(input);
			fireEvent.submit(input.form);
		});

		// then
		expect(onSubmit).toHaveBeenCalledTimes(1);
		expect(onSubmit.mock.calls[0][0]).toEqual({ name: '12' });

		// when
		await user.click(input);
		await user.clear(input);
		await user.keyboard('test{Enter}');

		// then
		expect(onSubmit.mock.calls[1][0]).toEqual({ name: 'test' });
	});

	it('should render RHF error', async () => {
		// given
		const onSubmit = jest.fn();
		// when
		render(
			<FormWrapper onSubmit={onSubmit}>
				<Input
					type="text"
					id="name"
					name="name"
					label="name"
					defaultValue="12"
					required
					rules={{
						required: 'This should not be empty',
					}}
				/>
			</FormWrapper>,
		);
		// then
		const input = screen.getByLabelText('name');
		await userEvent.clear(input);

		expect(screen.getByText('This should not be empty')).toBeInTheDocument();
	});
});
