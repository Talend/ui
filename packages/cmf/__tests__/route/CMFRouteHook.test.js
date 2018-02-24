import React from 'react';
import { shallow } from 'enzyme';
import { CMFRouteHook } from '../../src/route/CMFRouteHook';

const onEnter = 'myComponent:onEnter';
const onLeave = 'myComponent:onLeave';
function createContext(onEnterFn, onLeaveFn) {
	return {
		registry: {
			[`_.route.hook:${onEnter}`]: onEnterFn,
			[`_.route.hook:${onLeave}`]: onLeaveFn,
		},
	};
}

describe('CMFRouteHook', () => {
	it('should render its children', () => {
		// given
		const MyComponent = () => (<div>My component</div>);

		// when
		const wrapper = shallow(
			<CMFRouteHook>
				<MyComponent />
			</CMFRouteHook>
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should create onEnter/onLeave function', () => {
		// given
		const onEnterFn = jest.fn();
		const onLeaveFn = jest.fn();
		const context = createContext(onEnterFn, onLeaveFn);

		// when
		const wrapper = shallow(
			(
				<CMFRouteHook
					dispatch={jest.fn()}
					onEnter={onEnter}
					onLeave={onLeave}
				>
					<div />
				</CMFRouteHook>
			),
			{ context },
		);

		// then
		expect(wrapper.instance().onEnter).toBe(onEnterFn);
		expect(wrapper.instance().onLeave).toBe(onLeaveFn);
	});

	it('should call onEnter when componentDidMount', () => {
		// given
		const onEnterFn = jest.fn();
		const onLeaveFn = jest.fn();
		const context = createContext(onEnterFn, onLeaveFn);
		const dispatch = jest.fn();
		const match = { params: {} };

		// when
		shallow(
			(
				<CMFRouteHook
					dispatch={dispatch}
					onEnter={onEnter}
					onLeave={onLeave}
					match={match}
				>
					<div />
				</CMFRouteHook>
			),
			{ context },
		);

		// then
		expect(onEnterFn).toBeCalledWith({
			router: { match },
			dispatch,
		});
	});

	it('should call onLeave when componentWillUnmount', () => {
		// given
		const onEnterFn = jest.fn();
		const onLeaveFn = jest.fn();
		const context = createContext(onEnterFn, onLeaveFn);
		const dispatch = jest.fn();
		const match = { params: {} };

		const wrapper = shallow(
			(
				<CMFRouteHook
					dispatch={dispatch}
					onEnter={onEnter}
					onLeave={onLeave}
					match={match}
				>
					<div />
				</CMFRouteHook>
			),
			{ context },
		);
		expect(onLeaveFn).not.toBeCalled();

		// when
		wrapper.unmount();

		// then
		expect(onLeaveFn).toBeCalledWith({
			router: { match },
			dispatch,
		});
	});
});
