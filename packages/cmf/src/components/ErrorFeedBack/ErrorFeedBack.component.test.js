import React from 'react';
import { render } from '@testing-library/react';
import Component from './ErrorFeedBack.component';

global.window.URL.createObjectURL = jest.fn();

describe('Component ErrorFeedBack', () => {
	beforeEach(() => {
		window.URL.revokeObjectURL = jest.fn();
	});
	it('should render ErrorPanel', () => {
		const errors = [
			{
				name: 'Error',
				message: 'foo',
			},
		];
		const wrapper = render(<Component errors={errors} />);
		const panels = wrapper.container.querySelectorAll('.error-title');
		expect(panels.length).toBe(1);
		expect(panels[0].textContent).toEqual(`${errors[0].name}: ${errors[0].message}`);
	});
	it('should add marginTop in fullPage mode', () => {
		const errors = [
			{
				message: 'Error message',
				name: 'Error name',
				stack: 'Error stack',
			},
		];
		const wrapper = render(<Component errors={errors} fullPage />);
		expect(wrapper.container.querySelector('.col-md-6').style.marginTop).toBe('200px');
	});
});
