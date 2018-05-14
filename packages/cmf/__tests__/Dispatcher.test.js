import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';
import { Dispatcher, checkIfActionInfoExist } from '../src/Dispatcher';

jest.mock('../src/api', () => ({
	actionCreator: {
		get(context, id) {
			if (
				id !== 'existingActionCreator:id' &&
				id !== 'actionCreator:id' &&
				id !== 'noOp' &&
				id !== 'another:actionCreator:id'
			) {
				throw new Error(`action not found id: ${id}`);
			}
		},
	},
	action: {
		getOnProps() {
			return ['onClick', 'onDoubleClick'];
		},
	},
}));

const mockContext = {
	registry: {},
};

describe('Testing <Dispatcher />', () => {
	function replacer(k, v) {
		let val = v;
		if (typeof v === 'function') {
			val = '[Function]';
		}
		return val;
	}
	const noOp = () => {};

	it('should inject dispatchable on(event) props into its children', () => {
		const dispatchActionCreator = jest.fn();
		const wrapper = mount(
			<Dispatcher
				onClick="actionCreator:id"
				onDoubleClick="another:actionCreator:id"
				dispatchActionCreator={dispatchActionCreator}
			>
				<button />
			</Dispatcher>,
			{
				context: mockContext,
			},
		);
		expect(
			JSON.stringify(wrapper.find('button').props(), replacer).replace(/(\\t|\\n)/g, ''),
		).toEqual(
			JSON.stringify({ onClick: noOp, onDoubleClick: noOp }, replacer).replace(/(\\t|\\n)/g, ''),
		);
	});

	it('should checkIfActionInfoExist do not throw with action object', () => {
		const props = {
			onClick: {
				id: 'test',
				name: 'Test',
				type: 'TEST_ACTION',
			},
		};
		const check = () => {
			checkIfActionInfoExist(props, {});
		};
		expect(check).not.toThrow();
	});

	it('should have its method onEvent called when children handle an event', () => {
		const wrapper = shallow(
			<Dispatcher onClick="noOp" onDoubleClick="noOp">
				<button />
			</Dispatcher>,
			{
				context: mockContext,
			},
		);
		const buttonWrapper = wrapper.find('button').at(0);
		const instance = wrapper.instance();
		spyOn(instance, 'onEvent');
		buttonWrapper.simulate('click');
		expect(instance.onEvent).toHaveBeenCalled();
		expect(instance.onEvent).toHaveBeenCalledWith(undefined, 'onClick');
	});

	it(
		'should call api.actionCreator.get and reThrow at mount time' +
			"if action info bind onto on[eventName] can't be found in settings",
		() => {
			expect(() => {
				mount(
					<Dispatcher onClick="error:actionCreator:id" onDoubleClick="another:actionCreator:id">
						<button />
					</Dispatcher>,
					{
						context: mockContext,
					},
				);
			}).toThrowError('action not found id: error:actionCreator:id');
		},
	);

	it(
		'should call api.actionCreator.get and reThrow at willreceivePropsTime' +
			"if action info bind onto on[eventName] can't be found in settings",
		() => {
			const wrapper = mount(
				<Dispatcher onClick="existingActionCreator:id" onDoubleClick="existingActionCreator:id">
					<button />
				</Dispatcher>,
				{
					context: mockContext,
				},
			);
			expect(() => {
				wrapper.setProps({ onClick: 'error:another:actionCreator:id' });
			}).toThrowError('action not found id: error:another:actionCreator:id');
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
			{
				context: mockContext,
				childContextTypes: {
					registry: PropTypes.object.isRequired,
				},
			},
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
			{
				context: mockContext,
				childContextTypes: {
					registry: PropTypes.object.isRequired,
				},
			},
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
		const wrapper = shallow(
			<Dispatcher dispatchActionCreator={dispatchActionCreator} preventDefault onClick="noOp">
				<a />
			</Dispatcher>,
			{
				context: mockContext,
			},
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
		const wrapper = shallow(<Dispatcher {...props} />, {
			context: mockContext,
		});
		wrapper.find('a').simulate('click', event);
		expect(dispatchActionCreator).toHaveBeenCalledWith('noOp', event, props);
	});
});
