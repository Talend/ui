import React from 'react';
import { shallow } from 'enzyme';
import Component, { getDefaultIcon } from './TreeBranchIcon.component';

jest.mock('react-i18next', () => {
	// eslint-disable-next-line global-require
	const mockTranslations = require('../../../../test/i18nMock').default;

	return mockTranslations();
});

describe('getDefaultIcon', () => {
	it('should return a custom object icon', () => {
		const myIcon = getDefaultIcon({
			useCustomIcon: true,
			getIcon: () => ({
				myIcon: 'myIcon',
				iconClassName: 'myIconClassName',
			}),
		});
		expect(myIcon).toEqual({ myIcon: 'myIcon', iconClassName: 'myIconClassName' });
	});
	it('should return an opened icon', () => {
		const myIcon = getDefaultIcon({ opened: true });
		expect(myIcon).toEqual({ name: 'talend-caret-down' });
	});
	it('should return a closed icon', () => {
		const myIcon = getDefaultIcon({ opened: false });
		expect(myIcon).toEqual({ name: 'talend-chevron-left' });
	});
});

describe('TreeBranchIcon', () => {
	it('should render an opened icon', () => {
		const wrapper = shallow(
			<Component
				dataKey="myDataKey"
				jsonpath="myJsonPath"
				onToggle={jest.fn()}
				opened
				value={{ value: 'myValue' }}
			/>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render an closed icon', () => {
		const wrapper = shallow(
			<Component
				dataKey="myDataKey"
				jsonpath="myJsonPath"
				onToggle={jest.fn()}
				opened={false}
				value={{ value: 'myValue' }}
			/>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should trigger onClick', () => {
		const event = {};
		const index = 0;
		const opened = true;
		const jsonpath = 'myJsonPath';
		const value = { value: 'myValue' };
		const onToggle = jest.fn();
		const wrapper = shallow(
			<Component
				index={index}
				jsonpath={jsonpath}
				onToggle={onToggle}
				opened={opened}
				value={value}
			/>,
		);
		wrapper.find('Icon').simulate('click', event);
		expect(onToggle).toHaveBeenCalledWith(event, { value, opened, jsonpath }, index);
	});
});
