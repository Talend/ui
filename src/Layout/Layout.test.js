import React from 'react';
import renderer from 'react-test-renderer';

import Layout from './Layout.component';

jest.mock('react-dom');
jest.mock('react-addons-css-transition-group', () => props => (
	<div className="react-addons-css-transition-group">
		{props.children}
	</div>
));

describe('Layout', () => {
	it('should render Layout OneColumn', () => {
		// given
		const header = { app: 'My app' };
		const one = (<h1>Column one</h1>);

		// when
		const wrapper = renderer.create(
			<Layout mode="OneColumn" one={one} header={header} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render Layout TwoColumns', () => {
		// given
		const header = { app: 'My app' };
		const one = (<h1>Column one</h1>);
		const two = (<h1>Column two</h1>);

		// when
		const wrapper = renderer.create(
			<Layout mode="TwoColumns" one={one} two={two} header={header} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render layout with Drawer component', () => {
		// given
		const header = { app: 'My app' };
		const one = (<h1>Column one</h1>);
		const two = (<h1>Column two</h1>);
		const drawers = [
			(<div style={{ width: 500 }}>
				<h1>Hello drawers</h1>
				<p>You should not being able to read this because I'm first</p>
			</div>),
			(<div style={{ width: 400 }}>
				<h1>Hello drawers</h1>
				<p>The content dictate the width</p>
			</div>),
		];

		// when
		const wrapper = renderer.create(
			<Layout mode="TwoColumns" one={one} two={two} header={header} drawers={drawers} />
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
