/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useForm, FormProvider } from 'react-hook-form';
import TextArea from './RHFTextArea.component';

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

describe('TextArea RHF widget', () => {
	it('should integrate with RHF', async () => {
		// given
		const onSubmit = jest.fn();
		await act(async () => {
			// when
			render(
				<FormWrapper onSubmit={onSubmit}>
					<TextArea id="name" name="name" label="name" defaultValue="12" />
				</FormWrapper>,
			);
			// then

			userEvent.click(screen.getByText('Submit'));
		});
		expect(onSubmit.mock.calls[0][0]).toEqual({ name: '12' });

		await act(async () => {
			userEvent.click(screen.getByRole('textbox'));
			userEvent.clear(screen.getByRole('textbox'));
			userEvent.keyboard('test');
			userEvent.click(screen.getByText('Submit'));
		});

		expect(onSubmit.mock.calls[1][0]).toEqual({ name: 'test' });
	});

	it('should render RHF error', async () => {
		// given
		const onSubmit = jest.fn();
		await act(async () => {
			// when
			render(
				<FormWrapper onSubmit={onSubmit}>
					<TextArea
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
			userEvent.click(screen.getByRole('textbox'));
			userEvent.clear(screen.getByRole('textbox'));
			userEvent.click(screen.getByText('Submit'));
		});
		expect(screen.getByText('This should not be empty')).toBeInTheDocument();
	});
});
