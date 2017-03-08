import React from 'react';
import renderer from 'react-test-renderer';

import Layout from './Layout.component';

jest.mock('react-dom');

const header = (<h1>Header</h1>);
const one = (<h1>Column one</h1>);
const two = (<h1>Column two</h1>);
const drawers = [
	(<div style={{ width: 500 }}>
		<h1>Hello drawers</h1>
		<p>You should not being able to read this because I&#39;m first</p>
	</div>),
	(<div style={{ width: 400 }}>
		<h1>Hello drawers</h1>
		<p>The content dictate the width</p>
	</div>),
];

describe('Layout', () => {
	it('should render Layout OneColumn', () => {
		const wrapper = renderer.create(
			<Layout mode="OneColumn" header={header}>
				{one}
			</Layout>
		).toJSON();

		expect(wrapper).toMatchSnapshot();
	});

	it('should render Layout TwoColumns', () => {
		const wrapper = renderer.create(
			<Layout mode="TwoColumns" one={one} header={header}>
				{two}
			</Layout>
		).toJSON();

		expect(wrapper).toMatchSnapshot();
	});

	it('should render layout with Drawer component', () => {
		const wrapper = renderer.create(
			<Layout mode="TwoColumns" one={one} header={header} drawers={drawers}>
				{two}
			</Layout>
		).toJSON();

		expect(wrapper).toMatchSnapshot();
	});
});
