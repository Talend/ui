import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import TwoColumns from './TwoColumns.component';

describe('TwoColumns', () => {
	it('should render two columns', () => {
		// given
		const one = <div>Hello world</div>;

		// when
		const wrapper = shallow(
			<TwoColumns one={one} style={{ display: 'flex' }}>
				<span>children</span>
			</TwoColumns>,
		);

		// then
		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});
