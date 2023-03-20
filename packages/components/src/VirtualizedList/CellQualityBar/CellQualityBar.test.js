import React from 'react';

import { render } from '@testing-library/react';
import noop from 'lodash/noop';

import { CellQualityBar } from './CellQualityBar.component';

const props = {
	invalid: 1,
	empty: 2,
	valid: 3,
	na: 4,
	onClick: noop,
	getDataFeature: noop,
};

describe('CellQualityBar', () => {
	it('should render an empty quality bar', () => {
		const { baseElement } = render(<CellQualityBar />);
		expect(baseElement).toMatchSnapshot();
	});

	it('should render a valid quality bar', () => {
		const { baseElement } = render(<CellQualityBar cellData={props} />);
		expect(baseElement).toMatchSnapshot();
	});
});
