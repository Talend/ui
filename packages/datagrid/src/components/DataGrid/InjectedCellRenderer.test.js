import React from 'react';
import { shallow } from 'enzyme';
import cmf from '@talend/react-cmf';
import InjectedCellRenderer from './InjectedCellRenderer.component';

jest.mock('@talend/react-cmf', () => ({
	component: {
		get: () => {},
	},
}));

describe('#injectedCellRenderer', () => {
	const avroRenderer = {};
	const colDef = {
		avroRenderer,
		injectedCellRenderer: 'cellRenderer',
	};
	const myProps = {};

	it('should injected the cell renderer', () => {
		const Component = () => {};
		cmf.component.get = jest.fn(() => Component);

		const wrapper = shallow(<InjectedCellRenderer colDef={colDef} myProps={myProps} />);

		expect(wrapper.find('Component').length).toBe(1);
		expect(cmf.component.get).toHaveBeenCalledWith(colDef.injectedCellRenderer);
		expect(wrapper.props().myProps).toBe(myProps);
		expect(wrapper.props().avroRenderer).toBe(avroRenderer);
		expect(wrapper.props().getComponent).toBe(cmf.component.get);
	});

	it('should injected the default cell renderer', () => {
		cmf.component.get = null;

		const wrapper = shallow(<InjectedCellRenderer colDef={colDef} myProps="myProps" />);

		expect(wrapper.find('DefaultCellRenderer').length).toBe(1);
	});
});
