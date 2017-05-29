import React from 'react';
import { shallow } from 'enzyme';

import { ObjectViewer as Component } from '@talend/react-components';
import Container, { DEFAULT_STATE } from './ObjectViewer.container';
import Connected from './ObjectViewer.connect';

const data = [
	{
		int: 1,
		str: 'test data for the object viewer',
		bool: true,
		obj: {
			bool: true,
		},
		arrayInt: [
			1, 2, 3, 4,
		],
		arrayOb: [
			{ foo: 'bar' },
		],
	},
	{
		int: 2,
		str: 'hello world',
		bool: false,
		obj: {
			bool: false,
		},
		arrayOb: [
			{ foo: 3.2 },
		],
	},
];

describe('Container ObjectViewer', () => {
	it('should pass needed props to pure component', () => {
		const setState = jest.fn();
		const wrapper = shallow(
			<Container
				data={data}
				state={DEFAULT_STATE}
				setState={setState}
			/>,
		);
		expect(wrapper.find(Component).length).toBe(1);
		const props = wrapper.props();
		expect(props.onChange).toBe(undefined);
		expect(props.onSubmit).toBe(undefined);
		expect(props.data).toBe(data);
		expect(typeof props.onClick).toBe('function');
		expect(Array.isArray(props.opened)).toBe(true);
		expect(props.opened.length).toBe(0);
		expect(Array.isArray(props.edited)).toBe(true);
		expect(props.edited.length).toBe(0);

		expect(wrapper.props().opened.length).toBe(0);
		const path = '$[0][\'obj\']';
		// open
		props.onClick(null, {
			isOpened: false,
			jsonpath: path,
		});
		expect(setState.mock.calls.length).toBe(1);
		expect(setState.mock.calls[0][0].get('opened').get(0)).toBe(path);
		// close
		props.onClick(null, {
			isOpened: true,
			jsonpath: path,
		});
		expect(setState.mock.calls.length).toBe(2);
		expect(setState.mock.calls[1][0].get('opened').size).toBe(0);
	});
	it('should add onChange is onSubmit', () => {
		const onSubmit = jest.fn();
		const setState = jest.fn();
		const wrapper = shallow(
			<Container
				data={data}
				state={DEFAULT_STATE}
				setState={setState}
				onSubmit={onSubmit}
			/>,
		);
		const props = wrapper.props();
		const path = '$[0][\'int\']';
		expect(typeof props.onChange).toBe('function');
		expect(props.onSubmit).toBe(onSubmit);
		props.onChange({
			target: {
				value: 2,
			},
		}, {
			jsonpath: path,
		});
		expect(setState.mock.calls.length).toBe(1);
		expect(setState.mock.calls[0][0].get('modified').size).toBe(1);
		expect(setState.mock.calls[0][0].get('modified').get(path)).toBe(2);

		props.onClick(null, {
			edit: false,
			jsonpath: path,
		});
		expect(setState.mock.calls.length).toBe(2);
		expect(setState.mock.calls[1][0].get('edited').size).toBe(1);
	});
});

describe('Connected ObjectViewer', () => {
	it('should connect ObjectViewer', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
});

