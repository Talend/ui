import React from 'react';
import { shallow } from 'enzyme';

import Container from './MultiSelect.container';


describe('Container MultiSelect', () => {
	it('should render input with props', () => {
		const wrapper = shallow(<Container.WrappedComponent id="multiselect" />);
		expect(wrapper.find('input').props()).toMatchSnapshot();
	});
	it('getOptions should eleminate duplicate from parent', () => {
		// in case the parent resolveNames of existing value in selected we must remove duplicate
		const added = { added: [{ name: 'bar', value: 'bar' }] };
		const options = [{ name: 'Foo', value: 'foo' }, { name: 'bar', value: 'bar' }];
		let wrapper = shallow(<Container.WrappedComponent id="multiselect" options={options} />);
		wrapper = wrapper.setState(added);
		expect(wrapper.instance().getOptions().length).toBe(2);
	});
	it('selectAll doesn t select create new option', () => {
		const options = [{ name: 'Foo', value: 'foo' }, { name: 'bar', value: 'bar' }];
		let wrapper = shallow(<Container.WrappedComponent id="multiselect" options={options} />);
		wrapper = wrapper.setState({ showDropdown: true, searchTerm: 'fo' });
		// check if we have create new option
		expect(wrapper.find('Dropdown').props().items[2]).toMatchObject({
			value: 'create-new',
			selected: undefined,
		});
		wrapper.find('Dropdown').simulate('rowClick', {}, 'select-all');
		const selected = wrapper.state('selected');
		expect(selected.size).toBe(1);
		expect(selected.get('foo')).toBe(true);
		// next render will call
		const nextItems = wrapper.instance().getListItems();
		expect(nextItems[0].selected).toBe(true);
		expect(nextItems[1].selected).toBe(true);
		expect(nextItems[2].selected).toBe(undefined);
	});
});
