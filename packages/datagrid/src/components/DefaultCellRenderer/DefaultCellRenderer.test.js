import React from 'react';

import { render } from '@testing-library/react';

import { QUALITY_EMPTY_KEY } from '../../constants';
import DefaultCellRenderer from './DefaultCellRenderer.component';

describe('#DefaultCellRenderer', () => {
	it('should render DefaultCellRenderer', () => {
		const wrapper = render(
			<DefaultCellRenderer
				avro={{ type: 'string' }}
				value={{ quality: QUALITY_EMPTY_KEY, value: 'value' }}
			/>,
		);

		expect(wrapper.asFragment()).toMatchSnapshot();
	});

	it('should render the default cell on loading state', () => {
		const wrapper = render(<DefaultCellRenderer data={{ loaded: false }} />);

		expect(wrapper.asFragment()).toMatchSnapshot();
	});
});
