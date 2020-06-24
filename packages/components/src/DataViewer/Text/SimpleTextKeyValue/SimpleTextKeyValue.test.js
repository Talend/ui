import React from 'react';
import { shallow } from 'enzyme';
import SimpleTextKeyValue, { AvroRenderer } from './SimpleTextKeyValue.component';

describe('SimpleTextKeyValue', () => {
	it('should render the key and the value', () => {
		const wrapper = shallow(
			<SimpleTextKeyValue
				className="myCLass"
				formattedKey="myKey"
				value="myValue"
				separator=" : "
				style={{ padding: 0 }}
			/>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render the key by the talend.component.label property', () => {
		const wrapper = shallow(
			<SimpleTextKeyValue
				className="myCLass"
				formattedKey="non readable value"
				schema={{ 'talend.component.label': 'readable value' }}
				value="myValue"
				separator=" : "
				style={{ padding: 0 }}
			/>,
		);

		expect(wrapper.find('.tc-simple-text-key').text()).toBe('readable value : ');
	});
	it('should render the value by the datagrid avroRenderer', () => {
		const schema = {
			type: {
				type: 'int',
			},
		};
		const data = {
			value: '',
		};
		const wrapper = shallow(
			<SimpleTextKeyValue
				className="myCLass"
				formattedKey="myKey"
				value={data}
				schema={schema}
				separator=" : "
				style={{ padding: 0 }}
			/>,
		);
		expect(wrapper.find(AvroRenderer).props()).toEqual({
			colDef: {
				avro: schema,
			},
			data,
		});
	});
	it('should render only the key', () => {
		const wrapper = shallow(<SimpleTextKeyValue formattedKey="myKey" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render only the value', () => {
		const wrapper = shallow(<SimpleTextKeyValue value="myValue" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render the type', () => {
		const schema = {
			type: {
				type: 'int',
			},
		};
		const data = {
			value: '',
		};
		const wrapper = shallow(
			<SimpleTextKeyValue
				className="myCLass"
				formattedKey="myKey"
				value={data}
				schema={schema}
				displayTypes
			/>,
		);
		expect(wrapper.find('.tc-simple-text-type').text()).toBe('- int');
	});
	it('should render the type with a custom render', () => {
		const schema = {
			type: {
				type: 'int',
			},
		};
		const data = {
			value: '',
		};
		const wrapper = shallow(
			<SimpleTextKeyValue
				className="myCLass"
				formattedKey="myKey"
				value={data}
				schema={schema}
				displayTypes
				typesRenderer={s => <span>And the type is {s.type.type}</span>}
			/>,
		);
		expect(wrapper.find('.tc-simple-text-type').text()).toBe('And the type is int');
	});
});
