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
});
