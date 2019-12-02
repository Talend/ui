import React from 'react';
import { shallow } from 'enzyme';

import TextModeFieldTemplate from './TextMode.component';

describe('FieldTemplate in text display mode', () => {
	it('should render dt/dd', () => {
		// when
		const wrapper = shallow(
			<TextModeFieldTemplate id={'myAwesomeField'} label={'My awesome label'}>
				My value as chrildren
			</TextModeFieldTemplate>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
