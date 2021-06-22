import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { useForm, FormProvider } from 'react-hook-form';
import TextArea from './RHFTextArea.component';

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
		// when
		const wrapper = mount(
			<FormWrapper onSubmit={onSubmit}>
				<TextArea id="name" name="name" label="name" defaultValue="12" />
			</FormWrapper>,
		);
		// then
		await act(async () => {
			wrapper.find('form').simulate('submit');
		});
		expect(onSubmit.mock.calls[0][0]).toEqual({ name: '12' });

		await act(async () => {
			const textarea = wrapper.find('textarea').at(0);
			textarea.getDOMNode().value = 'test';
			textarea.getDOMNode().dispatchEvent(new Event('textarea'));
			wrapper.find('form').simulate('submit');
		});

		expect(onSubmit.mock.calls[1][0]).toEqual({ name: 'test' });
	});

	it('should render RHF error', async () => {
		// given
		const onSubmit = jest.fn();
		// when
		const wrapper = mount(
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
		await act(async () => {
			const textarea = wrapper.find('textarea').at(0);
			textarea.getDOMNode().value = '';
			textarea.getDOMNode().dispatchEvent(new Event('textarea'));
			wrapper.find('form').simulate('submit');
		});
		wrapper.update();
		expect(wrapper.find('InlineMessage').props().description).toBe('This should not be empty');
	});
});
