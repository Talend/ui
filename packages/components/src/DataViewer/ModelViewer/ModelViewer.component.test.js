import React from 'react';
import { shallow } from 'enzyme';
import Component from './ModelViewer.component';
import i18next from '../../../i18n';

const t = i18next.t.bind(i18next);

describe('ModelViewer', () => {
	it('should render the ModelViewer', () => {
		const wrapper = shallow(<Component t={t} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
