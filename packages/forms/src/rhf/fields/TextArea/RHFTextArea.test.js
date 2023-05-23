/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act, fireEvent } from '@testing-library/react';

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
jest.useFakeTimers();

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
			fireEvent.click(screen.getByText('Submit'));
			jest.runAllTimers();
		});
		// then
		expect(onSubmit.mock.calls[0][0]).toEqual({ name: '12' });

		await act(async () => {
			fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
			fireEvent.click(screen.getByText('Submit'));
			jest.runAllTimers();
		});

		expect(onSubmit.mock.calls[1][0]).toEqual({ name: 'test' });
	});

	it('should render RHF error', async () => {
		// given
		const onSubmit = jest.fn();
		await act(async () => {
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
			// fireEvent.click(screen.getByRole('textbox'));
			fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });
			fireEvent.click(screen.getByText('Submit'));
			jest.runAllTimers();
		});

		expect(screen.getByText('This should not be empty')).toBeInTheDocument();
	});
});
