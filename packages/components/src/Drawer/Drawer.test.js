import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import faker from 'faker';

import Drawer, { cancelActionComponent } from './Drawer.component';

faker.seed(42);
describe('Drawer', () => {
	it('should render', () => {
		const wrapper = renderer
			.create(
				<Drawer>
					<h1>{faker.random.words()}</h1>
				</Drawer>,
			)
			.toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render without tc-drawer-transition class', () => {
		const wrapper = renderer
			.create(
				<Drawer withTransition={false}>
					<h1>{faker.random.words()}</h1>
				</Drawer>,
			)
			.toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render using custom styles', () => {
		const wrapper = renderer
			.create(
				<Drawer style={{ top: 45 }}>
					<h1>{faker.random.words()}</h1>
				</Drawer>,
			)
			.toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render using custom className', () => {
		const wrapper = renderer
			.create(
				<Drawer className="my-custom-drawer">
					<h1>{faker.random.words()}</h1>
				</Drawer>,
			)
			.toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render stacked', () => {
		const wrapper = renderer
			.create(
				<Drawer stacked>
					<h1>{faker.random.words()}</h1>
				</Drawer>,
			)
			.toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should not render if no children', () => {
		const wrapper = renderer.create(<Drawer />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render cancelActionComponent', () => {
		const wrapper = shallow(cancelActionComponent({}));
		expect(wrapper.find('<button />')).toBeTruthy();
	});
	it('should not render cancelActionComponent', () => {
		expect(cancelActionComponent()).toBe(null);
	});
	it('should render with tabs', () => {
		const tabs = {
			items: [
				{
					key: '1',
					label: faker.random.word(),
				},
				{
					key: '2',
					label: faker.random.word(),
				},
			],
			onSelect: jest.fn(),
			selected: '2',
		};
		const wrapper = renderer
			.create(
				<Drawer tabs={tabs}>
					<h1>{faker.random.words()}</h1>
				</Drawer>,
			)
			.toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
