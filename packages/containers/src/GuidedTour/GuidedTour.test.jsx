import { screen, render } from '@testing-library/react';
import { fromJS } from 'immutable';
import Connect from './GuidedTour.connect';
import Container from './GuidedTour.container';

const defaultProps = {
	state: fromJS({
		show: true,
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
	t: jest.fn(key => key),
};

describe('Guided Tour Connect', () => {
	it('should connect Guided Tour', () => {
		expect(Connect.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connect.WrappedComponent).toBe(Container);
	});
});

describe('Guided Tour Container', () => {
	it('should render', () => {
		render(<Container {...defaultProps} />);
		expect(document.querySelector('#___reactour')).toBeVisible();
		expect(screen.getByText('Text A')).toBeVisible();
		expect(document.querySelector('#___reactour')).toMatchSnapshot();
	});
});
