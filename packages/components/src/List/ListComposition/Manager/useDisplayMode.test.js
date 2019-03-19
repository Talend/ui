import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import useDisplayMode from './useDisplayMode';

function TestComponent({ initialDisplayMode, onDisplayModeChange, nextValue }) {
	const [displayMode, setDisplayMode] = useDisplayMode(initialDisplayMode, onDisplayModeChange);
	return <button onClick={event => setDisplayMode(event, nextValue)}>{displayMode}</button>;
}
TestComponent.propTypes = {
	initialDisplayMode: PropTypes.string,
	onDisplayModeChange: PropTypes.func,
	nextValue: PropTypes.string,
};

describe('List > useDisplayMode', () => {
	it('should trigger change callback in controlled mode', () => {
		// given
		const onDisplayModeChange = jest.fn();
		const nextValue = 'table';
		const wrapper = mount(
			<TestComponent
				initialDisplayMode="large"
				onDisplayModeChange={onDisplayModeChange}
				nextValue={nextValue}
			/>,
		);
		expect(onDisplayModeChange).not.toBeCalled();

		// when
		wrapper.find('button').simulate('click');

		// then
		expect(onDisplayModeChange).toBeCalledWith(expect.anything(), nextValue);
	});

	it('should set value in uncontrolled mode', () => {
		// given
		const wrapper = mount(<TestComponent initialDisplayMode="large" nextValue="table" />);
		expect(wrapper.find('button').text()).toBe('large');

		// when
		wrapper.find('button').simulate('click');

		// then
		expect(wrapper.find('button').text()).toBe('table');
	});
});
