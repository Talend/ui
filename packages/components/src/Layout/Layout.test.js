import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { SubHeaderBar } from '../SubHeaderBar/SubHeaderBar.component';

import Layout from './Layout.component';

jest.mock('react-dom');

const header = <h1>Header</h1>;
const subHeader = <SubHeaderBar title="defaultTitle" onGoBack={jest.fn()} />;
const footer = <h3>Footer</h3>;
const one = <h1>Column one</h1>;
const two = <h1>Column two</h1>;
const tabs = {
	items: [
		{
			id: 'tab-bar-action-1',
			key: '1',
			label: 'Tab1',
		},
		{
			id: 'tab-bar-action-2',
			key: '2',
			label: 'Tab2',
		},
		{
			id: 'tab-bar-action-3',
			key: '3',
			label: 'Tab3',
		},
	],
	onSelect: jest.fn(),
	selectedKey: '2',
};
const drawers = [
	<div style={{ width: 500 }}>
		<h1>Hello drawers</h1>
		<p>You should not being able to read this because I&#39;m first</p>
	</div>,
	<div style={{ width: 400 }}>
		<h1>Hello drawers</h1>
		<p>The content dictate the width</p>
	</div>,
];

describe('Layout', () => {
	it('should render Layout OneColumn', () => {
		const wrapper = renderer
			.create(
				<Layout mode="OneColumn" header={header}>
					{one}
				</Layout>,
			)
			.toJSON();

		expect(wrapper).toMatchSnapshot();
	});

	it('should render Layout TwoColumns', () => {
		const wrapper = renderer
			.create(
				<Layout mode="TwoColumns" one={one} header={header}>
					{two}
				</Layout>,
			)
			.toJSON();

		expect(wrapper).toMatchSnapshot();
	});

	it('should render layout with Drawer component', () => {
		const wrapper = renderer
			.create(
				<Layout mode="TwoColumns" one={one} header={header} drawers={drawers}>
					{two}
				</Layout>,
			)
			.toJSON();

		expect(wrapper).toMatchSnapshot();
	});

	it('should render layout with footer component', () => {
		const wrapper = renderer
			.create(
				<Layout mode="OneColumn" header={header} footer={footer}>
					{one}
				</Layout>,
			)
			.toJSON();

		expect(wrapper).toMatchSnapshot();
	});

	it('should render layout without header', () => {
		const wrapper = renderer.create(<Layout mode="OneColumn">{one}</Layout>).toJSON();

		expect(wrapper).toMatchSnapshot();
	});

	it('should render layout with TabBar component', () => {
		const wrapper = renderer
			.create(
				<Layout mode="TwoColumns" one={one} header={header} tabs={tabs}>
					{two}
				</Layout>,
			)
			.toJSON();

		expect(wrapper).toMatchSnapshot();
	});
	it('should render layout with SubHeader', () => {
		const wrapper = shallow(subHeader);
		expect(wrapper).toMatchSnapshot();
	});
	it('should render layout with subHeader in OneColumn mode', () => {
		const wrapper = shallow(
			<Layout subHeader={subHeader} mode="OneColumn">
				{one}
			</Layout>,
		);
		expect(wrapper.instance().props.subHeader).toEqual(subHeader);
		expect(wrapper.instance().props.mode).toEqual('OneColumn');
	});
	it('should render layout with subHeader in TwoColumns mode', () => {
		const wrapper = shallow(
			<Layout subHeader={subHeader} mode="TwoColumns">
				{one}
			</Layout>,
		);
		expect(wrapper.instance().props.subHeader).toEqual(subHeader);
		expect(wrapper.instance().props.mode).toEqual('TwoColumns');
	});
});
