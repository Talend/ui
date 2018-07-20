import React from 'react';
import { shallow } from 'enzyme';
import RichTitle from './RichTitle.component';

describe('RichTooltip', () => {
	it('should render RichTooltip with header, content and footer', () => {
		const wrapper = shallow(
			<RichTitle
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
