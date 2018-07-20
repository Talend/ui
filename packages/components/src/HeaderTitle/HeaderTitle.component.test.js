import React from 'react';
import { shallow } from 'enzyme';
import HeaderTitle from './HeaderTitle.component';

describe('HeaderTooltip', () => {
	it('should render HeaderTooltip with header, content and footer', () => {
		const wrapper = shallow(
			<HeaderTitle
				title="Pipelines"
				right={[
					{
						id: 'add',
						label: 'Add',
						bsStyle: 'info',
					},
				]}
			/>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
