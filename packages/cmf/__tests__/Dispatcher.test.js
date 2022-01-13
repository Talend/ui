import React from 'react';
import { mount } from 'enzyme';
import { mock } from '../src';
import ConnectedDispatcher, { Dispatcher } from '../src/Dispatcher';
import CONST from '../src/constant';

const noopRId = `${CONST.REGISTRY_ACTION_CREATOR_PREFIX}:noOp`;

describe('Testing <Dispatcher />', () => {
	let registry;
	const onError = jest.fn();
	beforeEach(() => {
		registry = {
			[`${CONST.REGISTRY_ACTION_CREATOR_PREFIX}:existingActionCreator:id`]: jest.fn(),
			[`${CONST.REGISTRY_ACTION_CREATOR_PREFIX}:actionCreator:id`]: jest.fn(),
			[`${CONST.REGISTRY_ACTION_CREATOR_PREFIX}:noOp`]: jest.fn(),
			[`${CONST.REGISTRY_ACTION_CREATOR_PREFIX}:another:actionCreator:id`]: jest.fn(),
		};

		jest.resetAllMocks();
	});

	it('should inject dispatchable on(event) props into its children', () => {
		const dispatchActionCreator = jest.fn();
		const wrapper = mount(
			<Dispatcher
				onClick="actionCreator:id"
				onDoubleClick="another:actionCreator:id"
				dispatchActionCreator={dispatchActionCreator}
			>
				<button type="button">Hello</button>
			</Dispatcher>,
			mock.Provider.getEnzymeOption({ registry, onError }),
		);
		expect(typeof wrapper.find('button').props().onClick).toEqual('function');
		expect(typeof wrapper.find('button').props().onDoubleClick).toEqual('function');
	});

	it('should throw with unknown action', () => {
		const opts = mock.Provider.getEnzymeOption({ registry });
		mount(
			<mock.Provider.ErrorBoundary onError={onError}>
				<Dispatcher
					onClick="actionCreator:id"
					onDoubleClick="unknnown:actionCreator:id"
					dispatchActionCreator={jest.fn()}
				>
					<button type="button">Hello</button>
				</Dispatcher>
			</mock.Provider.ErrorBoundary>,
			opts,
		);

		expect(onError).toHaveBeenCalled();
		expect(onError.mock.calls[0][0].message).toBe(
			'actionCreator not found in the registry: unknnown:actionCreator:id',
		);
	});

	it('should have its method onEvent called when children handle an event', () => {
		const wrapper = mount(
			<ConnectedDispatcher onClick="noOp" onDoubleClick="noOp">
				<button type="button">Hello</button>
			</ConnectedDispatcher>,
			mock.Provider.getEnzymeOption({ registry, onError }),
		);
		const buttonWrapper = wrapper.find('button');
		buttonWrapper.simulate('click');
		expect(registry[noopRId]).toHaveBeenCalled();
	});

	it(
		'should call cmf.actionCreator.get and reThrow at mount time' +
			"if action info bind onto on[eventName] can't be found in settings",
		() => {
			mount(
				<mock.Provider.ErrorBoundary onError={onError}>
					<Dispatcher onClick="error:actionCreator:id" onDoubleClick="another:actionCreator:id">
						<button type="button">Hello</button>
					</Dispatcher>
				</mock.Provider.ErrorBoundary>,
				mock.Provider.getEnzymeOption({ registry }),
			);
			expect(onError).toHaveBeenCalled();
			expect(onError.mock.calls[0][0].message).toBe(
				'actionCreator not found in the registry: error:actionCreator:id',
			);
		},
	);

	it('should not prevent event propagation by default', () => {
		const dispatchActionCreator = jest.fn();
		const onClick = jest.fn();
		const wrapper = mount(
			<div onClick={onClick}>
				<Dispatcher
					dispatchActionCreator={dispatchActionCreator}
					onClick="noOp"
					onDoubleClick="existingActionCreator:id"
				>
					<a />
				</Dispatcher>
			</div>,
			mock.Provider.getEnzymeOption({ registry, onError }),
		);
		wrapper.find('a').simulate('click');
		expect(onClick).toHaveBeenCalled();
	});

	it('should prevent event propagation if stopPropagation is set', () => {
		const dispatchActionCreator = jest.fn();
		const onClick = jest.fn();
		const wrapper = mount(
			<div onClick={onClick}>
				<Dispatcher
					dispatchActionCreator={dispatchActionCreator}
					stopPropagation
					onClick="noOp"
					onDoubleClick="existingActionCreator:id"
				>
					<a />
				</Dispatcher>
			</div>,
			mock.Provider.getEnzymeOption({ registry, onError }),
		);
		wrapper.find('a').simulate('click');
		expect(onClick).not.toHaveBeenCalled();
	});

	it('should preventDefault if props is set', () => {
		const dispatchActionCreator = jest.fn();
		const event = {
			type: 'click',
			preventDefault: jest.fn(),
		};
		const wrapper = mount(
			<Dispatcher dispatchActionCreator={dispatchActionCreator} preventDefault onClick="noOp">
				<a />
			</Dispatcher>,
			mock.Provider.getEnzymeOption({ registry, onError }),
		);
		wrapper.find('a').simulate('click', event);
		expect(event.preventDefault).toHaveBeenCalled();
	});

	it('should dispatch actionCreator with props as data', () => {
		const dispatchActionCreator = jest.fn();
		const event = {
			type: 'click',
			preventDefault: jest.fn(),
		};
		const props = {
			dispatchActionCreator,
			preventDefault: true,
			stopPropagation: false,
			onClick: 'noOp',
			extra: 'foo',
			children: <a />,
		};
		const wrapper = mount(
			<Dispatcher {...props} />,
			mock.Provider.getEnzymeOption({ registry, onError }),
		);
		wrapper.find('a').simulate('click', event);
		expect(dispatchActionCreator).toHaveBeenCalledWith(
			'noOp',
			expect.objectContaining(event),
			expect.objectContaining(props),
		);
	});
});
