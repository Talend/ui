import React from 'react';
import renderer from 'react-test-renderer';

import Layout from './Layout.component';

jest.mock('react-dom');

describe('Layout', () => {
	it('should render Layout OneColumn', () => {
		const one = (<h1>Column one</h1>);
		const wrapper = renderer.create(
			<Layout mode="OneColumn" one={one} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render Layout TwoColumns', () => {
		const one = (<h1>Column one</h1>);
		const two = (<h1>Column two</h1>);
		const wrapper = renderer.create(
			<Layout mode="TwoColumns" one={one} two={two} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
