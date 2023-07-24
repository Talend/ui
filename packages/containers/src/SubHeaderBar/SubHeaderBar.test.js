import { screen, render, fireEvent } from '@testing-library/react';
import { Map } from 'immutable';
import Container, { DEFAULT_STATE, DISPLAY_NAME } from './SubHeaderBar.container';
import Connect from './SubHeaderBar.connect';
import { getComponentState } from './SubHeaderBar.selectors';

describe('Connect', () => {
	it('should connect SubHeaderBar', () => {
		expect(Connect.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connect.WrappedComponent).toBe(Container);
	});
});

describe('SubHeaderBar container', () => {
	it('should render', () => {
		const { container } = render(<Container onGoBack={jest.fn()} />);
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should call onGoBack event when goBack event trigger', () => {
		// Given
		const props = {
			onGoBack: jest.fn(),
		};
		// When
		render(<Container {...props} />);
		fireEvent.click(screen.getByLabelText('Go back'));
		// Then
		expect(props.onGoBack).toHaveBeenCalled();
	});
	it('should call actionCreatorGoBack event when goBack event trigger', () => {
		// Given
		const props = {
			actionCreatorGoBack: 'myGoBackActionCreator',
			dispatchActionCreator: jest.fn(),
		};
		// When
		render(<Container {...props} />);
		fireEvent.click(screen.getByLabelText('Go back'));
		// Then
		expect(props.dispatchActionCreator).toHaveBeenCalledWith(
			props.actionCreatorGoBack,
			expect.anything(),
			{
				props,
			},
		);
	});
});

describe('SubHeaderBar selectors', () => {
	let mockState;
	const componentState = Map({});
	beforeEach(() => {
		mockState = {
			cmf: {
				components: Map({ [DISPLAY_NAME]: Map({ mySubHeaderBar: componentState }) }),
			},
		};
	});
	it('should return the state', () => {
		expect(getComponentState(mockState, 'mySubHeaderBar')).toEqual(componentState);
	});
	it('should return the default state', () => {
		expect(getComponentState(mockState, 'wrongComponentId')).toEqual(DEFAULT_STATE);
	});
});
