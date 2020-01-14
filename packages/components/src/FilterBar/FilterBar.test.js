import React from 'react';
import { shallow, mount } from 'enzyme';

import { FilterBarComponent } from './FilterBar.component';
import Icon from '../Icon';

let defaultProps = {};

describe('FilterBar', () => {
	beforeEach(() => {
		defaultProps = {
			docked: false,
			onFocus: jest.fn(),
			onBlur: jest.fn(),
			onFilter: jest.fn(),
			onToggle: jest.fn(),
		};
	});
	it('should call onToggle on search icon click', () => {
		// given
		const filterInstance = shallow(<FilterBarComponent {...defaultProps} docked />);
		// when
		filterInstance.find('Action').simulate('click');
		// then
		expect(defaultProps.onToggle).toBeCalled();
	});

	it('should render the filter if not dockabled', () => {
		// given
		const filterInstance = shallow(<FilterBarComponent {...defaultProps} dockable={false} />);
		// then
		expect(filterInstance.find('FilterInput').length).toBe(1);
	});

	it('should support external props', () => {
		// given
		const filterInstance = shallow(
			<FilterBarComponent {...defaultProps} className="custom-test" />,
		);
		// then
		expect(filterInstance.props().className).toContain('custom-test');
	});

	it('should accept data-test attribute', () => {
		// given
		const filterInstance = mount(<FilterBarComponent {...defaultProps} data-test={'my.test'} />);
		// then
		expect(filterInstance.find('input').prop('data-test')).toEqual('my.test');
	});

	it('should be able to switch autofocus to false', () => {
		// given
		const filterInstance = shallow(<FilterBarComponent {...defaultProps} autoFocus={false} />);
		// then
		expect(filterInstance.find('FilterInput').props().autoFocus).toBe(false);
	});

	it('should setstate focus to true onFocus event', () => {
		// given
		const instance = shallow(<FilterBarComponent {...defaultProps} />);
		expect(instance.state('focus')).toBe(false);
		// when
		instance.find('FilterInput').simulate('focus');
		// then
		expect(instance.state('focus')).toBe(true);
		expect(defaultProps.onFocus).toHaveBeenCalled();
	});

	it('should setstate focus to false onBlur event', () => {
		// given
		const instance = shallow(<FilterBarComponent {...defaultProps} />);
		expect(instance.state('focus')).toBe(false);
		// when
		instance.find('FilterInput').simulate('focus');
		instance.find('FilterInput').simulate('blur');
		// then
		expect(instance.state('focus')).toBe(false);
		expect(defaultProps.onBlur).toHaveBeenCalled();
	});

	it('should call onToggle on cross icon click', () => {
		// given
		const filterInstance = mount(
			<FilterBarComponent {...defaultProps} value={'initial value'} id={'id1'} />,
		);
		// when
		filterInstance.find('button').simulate('mouseDown');
		// then
		expect(defaultProps.onFilter).toBeCalledWith({ target: { value: '' } }, '');
	});

	it('should still have the icon visible on click', () => {
		const props = { ...defaultProps, iconAlwaysVisible: true };
		// given
		const filterInstance = shallow(<FilterBarComponent {...props} />);
		// when
		filterInstance.find('FilterInput').simulate('focus');
		// then
		expect(filterInstance.find(Icon).length).toEqual(1);
	});

	it('should call onFilter when input value change', () => {
		// given
		const filterInstance = mount(<FilterBarComponent {...defaultProps} />);
		// when
		filterInstance.find('input').simulate('change');
		// then
		expect(defaultProps.onFilter).toBeCalled();
	});

	it('should call onBlur on input blur', () => {
		// given
		const props = { ...defaultProps };
		const filterInstance = mount(<FilterBarComponent {...props} />);
		// when
		filterInstance.find('input').simulate('blur');
		// then
		expect(props.onBlur).toBeCalled();
	});

	it('should call onToggle on ESC keydown', () => {
		// given
		const props = { ...defaultProps, id: 'id1' };
		const filterInstance = mount(<FilterBarComponent {...props} />);
		// when
		filterInstance.find('input').simulate('keydown', { keyCode: 27 });
		// then
		expect(props.onFilter).toBeCalledWith({ target: { value: '' } }, '');
	});

	it('should call onToggle on ENTER keydown', () => {
		// given
		const props = { ...defaultProps };
		const filterInstance = mount(<FilterBarComponent {...props} id={'filter'} />);
		expect(document.activeElement.id).toBe('filter-input');

		// when
		filterInstance.find('input').simulate('keydown', { keyCode: 13 });

		// then
		expect(document.activeElement.id).toBe('');
	});

	it('should call onFilter with debounce options', done => {
		// given
		const debounceTimeout = 300;
		const props = {
			...defaultProps,
			debounceTimeout,
		};
		const filterInstance = mount(<FilterBarComponent {...props} />);
		// when
		filterInstance.find('input').simulate('change');

		// then
		expect(props.onFilter).not.toBeCalled();
		setTimeout(() => {
			expect(props.onFilter).toBeCalled();
			done();
		}, debounceTimeout);
	});

	it('should call onFilter with debounceMinLength options', done => {
		// given
		const debounceTimeout = 300;
		const props = {
			...defaultProps,
			debounceTimeout,
			debounceMinLength: 3,
		};
		const underMinLengthEvent = { target: { value: '2' } };
		const overMinLengthEvent = { target: { value: 'toto' } };
		const filterInstance = mount(<FilterBarComponent {...props} />);
		// when
		filterInstance.find('input').simulate('change', underMinLengthEvent);

		// then
		expect(props.onFilter).not.toBeCalled();

		// when
		filterInstance.find('input').simulate('change', overMinLengthEvent);

		// then
		setTimeout(() => {
			expect(props.onFilter).toBeCalled();
			done();
		}, debounceTimeout);
	});

	it('when value is not empty search icon should be displayed', () => {
		// given
		const props = { ...defaultProps, dockable: false };
		const filterInstance = mount(<FilterBarComponent {...props} />);
		// when
		// value is change by the user
		filterInstance.setState({ value: 'test' });
		// then the search icon should appear
		expect(filterInstance.find(Icon).length).toEqual(2);
	});

	it('when value is reset to undefined form outside search icon should be displayed', () => {
		// given
		const props = { ...defaultProps, dockable: false };
		const filterInstance = mount(<FilterBarComponent {...props} />);
		// when
		// value is change by the user
		filterInstance.setState({ value: 'test' });
		// and reset by the host
		filterInstance.setProps({ value: undefined });
		// then the search icon should appear
		expect(filterInstance.find(Icon).length).toEqual(1);
	});
});
