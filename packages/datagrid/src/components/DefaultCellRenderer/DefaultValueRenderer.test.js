import React from 'react';

import { render } from '@testing-library/react';

import DefaultValueRenderer from './DefaultValueRenderer.component';

describe('#DefaultValueRenderer', () => {
	it('should render without the tooltip', () => {
		const wrapper = render(<DefaultValueRenderer value={'loreum'} />);

		expect(wrapper.asFragment()).toMatchSnapshot();
	});

	it('should render a boolean', () => {
		const wrapper = render(<DefaultValueRenderer value={false} />);

		expect(wrapper.asFragment()).toHaveTextContent('false');
	});

	it('should render a bytes', () => {
		const wrapper = render(<DefaultValueRenderer value={{ bytes: 'ejfiejifje' }} />);

		expect(wrapper.asFragment()).toHaveTextContent('ejfiejifje');
	});

	it('should render empty when the value is null', () => {
		const wrapper = render(<DefaultValueRenderer value={null} />);

		expect(wrapper.asFragment()).toHaveTextContent('');
	});

	it('should render empty when the value is undefined', () => {
		const wrapper = render(<DefaultValueRenderer value={undefined} />);

		expect(wrapper.asFragment()).toHaveTextContent('');
	});

	it('should render the leading/trailing special character', () => {
		const wrapper = render(<DefaultValueRenderer value=" loreum " />);

		expect(wrapper.asFragment()).toMatchSnapshot('');
	});
});
