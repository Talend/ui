import React from 'react';
import { mount } from 'enzyme';
import { AboutDialog } from './AboutDialog.component';

const props = {
	show: true,
	version: 'Summer 18',
	icon: 'talend-tdp-colored',
	services: ['API', 'Dataset', 'Preparation', 'Transformation'].map(name => ({
		version: '2.8.0-SNAPSHOT',
		build: '87d0dcd-12e0d6f',
		name,
	})),
};

describe('AboutDialog', () => {
	it('should trigger action callback on more click', () => {
		const toggle = jest.fn();
		const wrapper = mount(<AboutDialog onToggle={toggle} {...props} />);
		wrapper
			.find('button')
			.at(1)
			.simulate('click');
		expect(toggle).toHaveBeenCalled();
	});
});
