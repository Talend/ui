/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm, FormProvider } from 'react-hook-form';
import Input from './RHFInput.component';

jest.unmock('@talend/design-system');
jest.mock('ally.js');

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
		// given
		const onSubmit = jest.fn();
		// when
		await act(async () => {
			render(
				<FormWrapper onSubmit={onSubmit}>
					<Input type="text" id="name" name="name" label="name" defaultValue="12" />
				</FormWrapper>,
			);
			const input = screen.getByLabelText('name');
			fireEvent.click(input);
			fireEvent.submit(input.form);
		});

		// then
		expect(onSubmit).toHaveBeenCalledTimes(1);
		expect(onSubmit.mock.calls[0][0]).toEqual({ name: '12' });

		// when
		await act(async () => {
			const input = screen.getByLabelText('name');
			await userEvent.click(input);
			await userEvent.clear(input);
			await userEvent.keyboard('test{Enter}');
		});

		// then
		expect(onSubmit.mock.calls[1][0]).toEqual({ name: 'test' });
	});

	it('should render RHF error', async () => {
		// given
		const onSubmit = jest.fn();
		// when
		await act(async () => {
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
		});

		expect(screen.getByText('This should not be empty')).toBeInTheDocument();
	});
});
