import React from 'react';

import { render } from '@testing-library/react';

import DefaultDateCellRenderer from './DefaultDateCellRenderer.component';

describe('#DefaultDateCellRenderer', () => {
	it('should render DefaultDateCellRenderer with DefaultValueRenderer', () => {
		const wrapper = render(<DefaultDateCellRenderer value={1511873062123} />);

		expect(wrapper.asFragment()).toHaveTextContent('2017-11-28T12:44:22.123Z');
	});

	it('should do nothing when value is null', () => {
		const wrapper = render(<DefaultDateCellRenderer value={null} />);

		expect(wrapper.asFragment()).toHaveTextContent('');
	});

	it('should do nothing when value is undefined', () => {
		const wrapper = render(<DefaultDateCellRenderer value={undefined} />);

		expect(wrapper.asFragment()).toHaveTextContent('');
	});

	it('should show initial value when the parsed value fails', () => {
		const wrapper = render(<DefaultDateCellRenderer value={'sdqs'} />);

		expect(wrapper.asFragment()).toHaveTextContent('sdqs');
	});

	it('should show one date when value is 0', () => {
		const wrapper = render(<DefaultDateCellRenderer value={0} />);
		expect(wrapper.asFragment()).toHaveTextContent('1970-01-01T00:00:00.000Z');
	});
});
