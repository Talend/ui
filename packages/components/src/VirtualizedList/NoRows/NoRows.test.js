import React from 'react';
import { mount } from 'enzyme';
import toJsonWithoutI18n from '../../../test/props-without-i18n';

import { NoRowsComponent } from './NoRows.component';

describe('NoRows', () => {
	it('should show no result', () => {
		const wrapper = mount(<NoRowsComponent />);

		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
	});
});
