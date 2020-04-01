import React from 'react';
import { shallow } from 'enzyme';
import Component from './RecordsViewer.component';
import i18next from '../../../i18n';

const t = i18next.t.bind(i18next);

describe('RecordsViewer', () => {
	it('should render a tree virtualized with a header', () => {
		const wrapper = shallow(<Component rowCount={10} onCollapseAll={jest.fn()} t={t} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render a tree (not virtualized) ', () => {
		const wrapper = shallow(<Component virtualized={false} onCollapseAll={jest.fn()} t={t} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
