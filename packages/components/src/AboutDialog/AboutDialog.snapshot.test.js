import React from 'react';
import { shallow } from 'enzyme';
import AboutDialog from './AboutDialog.component';

jest.mock('react-dom');

const props = {
	show: true,
	onToggle: jest.fn(),
	version: 'Summer 18',
	icon: 'talend-tdp-colored',
	services: ['API', 'Dataset', 'Preparation', 'Transformation'].map(name => ({
		version: '2.8.0-SNAPSHOT',
		build: '87d0dcd-12e0d6f',
		name,
	})),
};

describe('AboutDialog', () => {
	beforeAll(() => {
		const RealDate = Date;
		global.Date = jest.fn(() => new RealDate(2018, 1, 1));
	});

	it('should render', () => {
		const wrapper = shallow(<AboutDialog {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render with custom copyright', () => {
		const wrapper = shallow(<AboutDialog copyrights="custom copyrights" {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render services', () => {
		const wrapper = shallow(<AboutDialog {...props} expanded />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render in loading mode', () => {
		const wrapper = shallow(<AboutDialog {...props} loading />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
