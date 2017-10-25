import React from 'react';
import renderer from 'react-test-renderer';
import faker from 'faker';
import Layout from './Layout.component';

jest.mock('react-dom');

faker.seed(42);
const header = <h1>Header</h1>;
const footer = <h3>Footer</h3>;
const one = <h1>Column one</h1>;
const two = <h1>Column two</h1>;
const tabs = {
	items: [
		{
			id: 'tab-bar-action-1',
			key: '1',
			label: faker.random.word(),
		},
		{
			id: 'tab-bar-action-2',
			key: '2',
			label: faker.random.word(),
		},
		{
			id: 'tab-bar-action-3',
			key: '3',
			label: faker.random.word(),
		},
	],
	onSelect: jest.fn(),
	selected: '2',
};
const drawers = [
	<div style={{ width: 500 }}>
		<h1>{faker.random.words()}</h1>
		<p>{faker.random.words(10)}</p>
	</div>,
	<div style={{ width: 400 }}>
		<h1>{faker.random.words()}</h1>
		<p>{faker.random.words(10)}</p>
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
});
