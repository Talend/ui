import React from 'react';
import { createEvent, render } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
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

	it('should add onclick event handler to its children', () => {
		const dispatchActionCreator = jest.fn();

		const { container } = render(
			<mock.Provider registry={registry} onError={onError}>
				<Dispatcher onClick="actionCreator:id" dispatchActionCreator={dispatchActionCreator}>
					<button type="button">Hello</button>
				</Dispatcher>
			</mock.Provider>,
		);
		expect(typeof container.querySelector('button').onclick).toEqual('function');
	});

	it('should throw with unknown action', () => {
		render(
			<mock.Provider registry={registry}>
				<mock.Provider.ErrorBoundary onError={onError}>
					<Dispatcher onClick="unknnown:actionCreator:id" dispatchActionCreator={jest.fn()}>
						<button type="button">Hello</button>
					</Dispatcher>
				</mock.Provider.ErrorBoundary>
			</mock.Provider>,
		);

		expect(onError).toHaveBeenCalled();
		expect(onError.mock.calls[0][0].message).toBe(
			'actionCreator not found in the registry: unknnown:actionCreator:id',
		);
	});

	it('should have its method onEvent called when children handle an event', () => {
		const { container } = render(
			<mock.Provider registry={registry}>
				<ConnectedDispatcher onClick="noOp">
					<button type="button">Hello</button>
				</ConnectedDispatcher>
			</mock.Provider>,
		);
		const buttonWrapper = container.querySelector('button');
		fireEvent.click(buttonWrapper);
		expect(registry[noopRId]).toHaveBeenCalled();
	});

	it(
		'should call cmf.actionCreator.get and reThrow at mount time' +
			"if action info bind onto on[eventName] can't be found in settings",
		() => {
			render(
				<mock.Provider registry={registry}>
					<mock.Provider.ErrorBoundary onError={onError}>
						<Dispatcher onClick="error:actionCreator:id" onDoubleClick="another:actionCreator:id">
							<button type="button">Hello</button>
						</Dispatcher>
					</mock.Provider.ErrorBoundary>
				</mock.Provider>,
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
		const wrapper = render(
			<mock.Provider registry={registry}>
				<div onClick={onClick}>
					<Dispatcher
						dispatchActionCreator={dispatchActionCreator}
						onClick="noOp"
						onDoubleClick="existingActionCreator:id"
					>
						<a />
					</Dispatcher>
				</div>
			</mock.Provider>,
		);
		fireEvent.click(wrapper.container.querySelector('a'));
		expect(onClick).toHaveBeenCalled();
	});

	it('should prevent event propagation if stopPropagation is set', () => {
		const dispatchActionCreator = jest.fn();
		const onClick = jest.fn();
		const wrapper = render(
			<mock.Provider registry={registry}>
				<div onClick={onClick}>
					<Dispatcher
						dispatchActionCreator={dispatchActionCreator}
						stopPropagation
						onClick="noOp"
						onDoubleClick="existingActionCreator:id"
					>
						<a />
					</Dispatcher>
				</div>
			</mock.Provider>,
		);
		fireEvent.click(wrapper.container.querySelector('a'));
		expect(onClick).not.toHaveBeenCalled();
	});

	it('should preventDefault if props is set', () => {
		const dispatchActionCreator = jest.fn();
		const wrapper = render(
			<mock.Provider registry={registry}>
				<Dispatcher dispatchActionCreator={dispatchActionCreator} preventDefault onClick="noOp">
					<a />
				</Dispatcher>
			</mock.Provider>,
		);
		const el = wrapper.container.querySelector('a');
		const event = createEvent.click(el, {});
		event.preventDefault = jest.fn();
		fireEvent(el, event);
		expect(event.preventDefault).toHaveBeenCalled();
	});

	it('should dispatch actionCreator with props as data', () => {
		const dispatchActionCreator = jest.fn();
		const props = {
			dispatchActionCreator,
			preventDefault: true,
			stopPropagation: false,
			onClick: 'noOp',
			extra: 'foo',
		};
		const wrapper = render(
			<mock.Provider registry={registry}>
				<Dispatcher {...props}>
					<a />
				</Dispatcher>
			</mock.Provider>,
		);
		const el = wrapper.container.querySelector('a');

		const event = createEvent.click(el, {});
		event.preventDefault = jest.fn();
		expect(event.type).toBe('click');

		fireEvent(el, event);
		expect(dispatchActionCreator).toHaveBeenCalledWith(
			'noOp',
			expect.objectContaining({}),
			expect.objectContaining(props),
		);
	});
});
