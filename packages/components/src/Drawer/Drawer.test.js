import React from 'react';
import renderer from 'react-test-renderer';

import Drawer from './Drawer.component';

describe('Drawer', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Drawer>
				<h1>Hello world</h1>
			</Drawer>
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render using custom styles', () => {
		const wrapper = renderer.create(
			<Drawer style={{ top: 45 }}>
				<h1>Hello world</h1>
			</Drawer>
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render using custom className', () => {
		const wrapper = renderer.create(
			<Drawer className="my-custom-drawer">
				<h1>Hello world</h1>
			</Drawer>
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should not render if no children', () => {
		const wrapper = renderer.create(
			<Drawer />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
