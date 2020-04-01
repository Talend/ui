import React from 'react';
import { shallow } from 'enzyme';
import Container, { getIcon } from './RecordsViewer.container';

describe('RecordsViewer', () => {
	it('should render recordsViewer', () => {
		const wrapper = shallow(<Container />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('getIcon', () => {
	it('should return the plus circle and icon class', () => {
		expect(getIcon()).toEqual({
			className: 'theme-tc-records-viewer-branch-icon tc-records-viewer-branch-icon',
			name: 'talend-plus-circle',
		});
	});
	it('should return the minus circle and icon class', () => {
		expect(getIcon(true)).toEqual({
			className: 'theme-tc-records-viewer-branch-icon tc-records-viewer-branch-icon',
			name: 'talend-minus-circle',
		});
	});
});
