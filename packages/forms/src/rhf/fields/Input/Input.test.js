import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { useForm, FormProvider } from 'react-hook-form/dist/index.ie11';
import Input from './RHFInput.component';

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
		const wrapper = mount(
			<FormWrapper onSubmit={onSubmit}>
				<Input type="text" id="name" name="name" label="name" defaultValue="12" />
			</FormWrapper>,
		);
		// then
		await act(async () => {
			wrapper.find('form').simulate('submit');
		});
		expect(onSubmit.mock.calls[0][0]).toEqual({ name: '12' });

		await act(async () => {
			const input = wrapper.find('input').at(0);
			input.getDOMNode().value = 'test';
			input.getDOMNode().dispatchEvent(new Event('input'));
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
		expect(wrapper.find('p[id="name-error"]').text()).toBe('');

		await act(async () => {
			const input = wrapper.find('input').at(0);
			input.getDOMNode().value = '';
			input.getDOMNode().dispatchEvent(new Event('input'));
		});

		expect(wrapper.find('p[id="name-error"]').text()).toBe('This should not be empty');
	});
});
