import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { useForm, FormProvider } from 'react-hook-form';
import Select from './RHFSelect.component';

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
		const wrapper = mount(
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
		await act(async () => {
			wrapper.find('form').simulate('submit');
		});
		expect(onSubmit.mock.calls[0][0]).toEqual({ name: 'blue' });

		await act(async () => {
			const select = wrapper.find('select').at(0);
			select.getDOMNode().value = 'red';
			select.getDOMNode().dispatchEvent(new Event('change'));
			wrapper.find('form').simulate('submit');
		});

		expect(onSubmit.mock.calls[1][0]).toEqual({ name: 'red' });
	});

	it('should render RHF error', async () => {
		// given
		const onSubmit = jest.fn();
		// when
		const wrapper = mount(
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
		await act(async () => {
			const select = wrapper.find('select').at(0);
			select.getDOMNode().value = '';
			select.getDOMNode().dispatchEvent(new Event('change'));
		});

		wrapper.update();
		expect(wrapper.find('InlineMessage').at(0).props().description).toBe('This should not be empty');
	});
});
