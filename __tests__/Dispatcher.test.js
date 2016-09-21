import React from 'react';
import { shallow, mount } from 'enzyme';
import { Dispatcher, checkIfActionInfoExist } from '../src/Dispatcher';

jest.mock('../src/api', () => ({
	action: {
		getActionInfo(context, id) {
			if (id !== 'existingActionCreator:id') {
				throw new Error(`action not found id: ${id}`);
			}
		},
		getOnProps() {
			return ['onClick', 'onStuff'];
		},
	},
}));

describe('Testing <Dispatcher />', () => {
	function replacer(k, v) {
		let val = v;
		if (typeof v === 'function') {
			val = '[Function]';
		}
		return val;
	}
	const noOp = () => { };

	it('should inject dispatchable on(event) props into its children', () => {
		const wrapper = shallow(
			<Dispatcher onClick="actionCreator:id" onStuff="another:actionCreator:id">
				<button />
			</Dispatcher>
		);
		expect(
			JSON.stringify(wrapper.find('button').props(), replacer).replace(/(\\t|\\n)/g, '')
		).toEqual(
			JSON.stringify({ onClick: noOp, onStuff: noOp }, replacer).replace(/(\\t|\\n)/g, '')
			);
	});
	it('should checkIfActionInfoExist do not throw with action object', () => {
		const props = { onClick: {
			id: 'test',
			name: 'Test',
			type: 'TEST_ACTION',
		}};
		const check = () => {
			checkIfActionInfoExist(props, {});
		};
		expect(check).not.toThrow();
	});
	it('should have its method onEvent called when children handle an event', () => {
		const wrapper = shallow(
			<Dispatcher onClick={noOp} onStuff={noOp}>
				<button />
			</Dispatcher>
		);
		const buttonWrapper = wrapper.find('button');
		const instance = wrapper.instance();
		spyOn(instance, 'onEvent');
		buttonWrapper.simulate('click');
		expect(instance.onEvent).toHaveBeenCalled();
		expect(instance.onEvent).toHaveBeenCalledWith(undefined, 'onClick');
	});

	it('should call getActionInfo and reThrow at mount time'
		+ 'if action info bind onto on[eventName] can\'t be found in settings', () => {
		expect(() => {
			mount(
				<Dispatcher onClick="actionCreator:id" onStuff="another:actionCreator:id">
					<button />
				</Dispatcher>
			);
		}).toThrowError('action not found id: actionCreator:id');
	});

	it('should call getActionInfo and reThrow at willreceivePropsTime'
		+ 'if action info bind onto on[eventName] can\'t be found in settings', () => {
		const wrapper = mount(
			<Dispatcher onClick="existingActionCreator:id" onStuff="existingActionCreator:id">
				<button />
			</Dispatcher>
		);
		expect(() => {
			wrapper.setProps({ onClick: 'another:actionCreator:id' });
		}).toThrowError('action not found id: another:actionCreator:id');
	});
});
