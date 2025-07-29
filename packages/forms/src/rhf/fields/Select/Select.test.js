/* eslint-disable testing-library/no-unnecessary-act */
import { FormProvider, useForm } from 'react-hook-form';

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Select from './RHFSelect.component';

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
				<Select
					id="name"
					name="name"
					label="name"
					options={[
						{ value: 'blue', name: 'Blue color' },
						{ value: 'red', name: 'Red color' },
					]}
					required
					rules={{
						required: 'This should not be empty',
					}}
				/>{' '}
			</FormWrapper>,
		);
		// then
		await user.selectOptions(screen.getByRole('combobox'), 'blue');
		await user.click(screen.getByRole('button', { name: 'Submit' }));

		expect(onSubmit).toHaveBeenCalledTimes(1);
		expect(onSubmit.mock.calls[0][0]).toEqual({ name: 'blue' });

		await user.selectOptions(screen.getByRole('combobox'), 'red');
		await user.click(screen.getByText('Submit'));

		expect(onSubmit.mock.calls[1][0]).toEqual({ name: 'red' });
	});

	it('should render RHF error', async () => {
		// given
		const onSubmit = jest.fn();
		render(
			<FormWrapper onSubmit={onSubmit}>
				<Select
					id="name"
					name="name"
					label="name"
					options={[
						{ value: 'blue', name: 'Blue color' },
						{ value: 'red', name: 'Red color' },
					]}
					required
					rules={{
						required: 'This should not be empty',
					}}
				/>
			</FormWrapper>,
		);

		// then
		await act(() => (screen.getByRole('combobox').value = ''));
		fireEvent.change(screen.getByRole('combobox'));

		// then
		expect(screen.getByText('Red color').selected).toBe(false);
		expect(screen.getByText('Blue color').selected).toBe(false);
		await waitFor(() => screen.findByText('This should not be empty'));
		expect(screen.getByText('This should not be empty')).toBeInTheDocument();
	});
});
