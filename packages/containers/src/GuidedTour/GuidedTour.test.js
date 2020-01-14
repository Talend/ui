import React from 'react';
import { shallow } from 'enzyme/build';
import { fromJS } from 'immutable';
import Connect from './GuidedTour.connect';
import Container from './GuidedTour.container';

const defaultProps = {
	state: fromJS({
		isOpen: true,
	}),
	steps: [
		{
			content: {
				body: 'Text A',
			},
		},
		{
			content: {
				body: 'Text B',
			},
		},
		{
			content: {
				body: 'Text C',
			},
		},
	],
};

describe('Guided Tour Connect', () => {
	it('should connect Guided Tour', () => {
		expect(Connect.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connect.WrappedComponent).toBe(Container);
	});
});

describe('Guided Tour Container', () => {
	it('should render', () => {
		const wrapper = shallow(<Container {...defaultProps} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
