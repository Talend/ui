import React from 'react';
import renderer from 'react-test-renderer';

import Drawers from './Drawers.component';

jest.mock('react-addons-css-transition-group');

const drawers = [
	(<div>
		<h1>Hello drawers</h1>
		<p>You should not being able to read this because I&#39;m first</p>
	</div>),
	(<div>
		<h1>Hello drawers</h1>
		<p>The content dictate the width</p>
	</div>),
];

describe('Drawers', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Drawers drawers={drawers} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render without drawers', () => {
		const wrapper = renderer.create(
			<Drawers />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
