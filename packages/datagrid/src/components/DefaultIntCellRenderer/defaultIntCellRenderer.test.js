import React from 'react';

import { render } from '@testing-library/react';

import DefaultIntCellRenderer from './DefaultIntCellRenderer.component';

describe('#DefaultDateCellRenderer', () => {
	it('should render DefaultDateCellRenderer', () => {
		const wrapper = render(<DefaultIntCellRenderer value={42.42} />);

		expect(wrapper.asFragment()).toHaveTextContent('42.42');
	});
});
