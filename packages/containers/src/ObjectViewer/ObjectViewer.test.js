import React from 'react';
import { shallow, mount } from 'enzyme';

import Component from '@talend/react-components/lib/ObjectViewer';
import Container, {
	DEFAULT_STATE,
	toggleState,
	selectWrapper,
	editWrapper,
	change,
} from './ObjectViewer.container';
import Connected from './ObjectViewer.connect';

const path = "$[0]['arrayInt']";
const kTrue = true;
const data = [
	{
		int: 1,
		str: 'test data for the object viewer',
		bool: true,
		obj: {
			bool: true,
		},
		arrayInt: [1, 2, 3, 4],
		arrayOb: [{ foo: 'bar' }],
	},
	{
		int: 2,
		str: 'hello world',
		bool: false,
		obj: {
			bool: false,
		},
		arrayOb: [{ foo: 3.2 }],
	},
];

describe('Container ObjectViewer', () => {
	it('should pass needed props to pure component', () => {
		const setState = jest.fn();
		const wrapper = shallow(<Container data={data} state={DEFAULT_STATE} setState={setState} />);
		expect(wrapper.find(Component).length).toBe(1);
		const props = wrapper.props();
		expect(props.onChange).toBe(undefined);
		expect(props.onSubmit).toBe(undefined);
		expect(props.data).toBe(data);
		expect(typeof props.onSelect).toBe('function');
		expect(typeof props.onToggle).toBe('function');
		expect(Array.isArray(props.opened)).toBe(true);
		expect(props.opened.length).toBe(0);
		expect(Array.isArray(props.edited)).toBe(true);
		expect(props.edited.length).toBe(0);

		// open
		props.onToggle(null, {
			isOpened: false,
			jsonpath: path,
		});

		expect(typeof setState.mock.calls[0][0]).toBe('function');
	});
	xit('should not display types by default', () => {
		const setState = jest.fn();
		const wrapper = shallow(<Container data={data} state={DEFAULT_STATE} setState={setState} />);

		expect(wrapper.find('.tc-object-viewer-line-type').length).toBe(0);
	});
	xit('should display types', () => {
		const setState = jest.fn();
		const wrapper = mount(
			<Container data={data} state={DEFAULT_STATE} setState={setState} showType={kTrue} />,
		);

		expect(wrapper.find('.tc-object-viewer-line-type').length).not.toBe(0);
	});
	it('should add onChange is onSubmit', () => {
		const onSubmit = jest.fn();
		const setState = jest.fn();
		const wrapper = shallow(
			<Container data={data} state={DEFAULT_STATE} setState={setState} onSubmit={onSubmit} />,
		);
		const props = wrapper.props();

		expect(typeof props.onChange).toBe('function');
		expect(typeof props.onEdit).toBe('function');
		expect(props.onSubmit).toBe(onSubmit);
		props.onChange(
			{
				target: {
					value: 2,
				},
			},
			{
				jsonpath: path,
			},
		);

		expect(setState.mock.calls.length).toBe(1);
		expect(typeof setState.mock.calls[0][0]).toBe('function');
	});
});

describe('Connected ObjectViewer', () => {
	it('should connect ObjectViewer', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
});

describe('editValue', () => {
	it('should edit', () => {
		const prevState = { state: DEFAULT_STATE };
		const someData = {
			edit: false,
			jsonpath: path,
		};

		prevState.state = editWrapper(prevState, someData);
		expect(prevState.state.get('edited').size).toBe(1);
	});
	it('should change', () => {
		const prevState = { state: DEFAULT_STATE };

		prevState.state = change(path, prevState.state, 'new label');

		expect(prevState.state.get('modified').size).toBe(1);
	});
});

describe('toggleState', () => {
	const prevState = { state: DEFAULT_STATE };
	it('should open', () => {
		const newState = toggleState(prevState, { isOpened: false, jsonpath: path });
		expect(newState.get('opened').size).toBe(1);
		expect(newState.get('opened').first()).toEqual(path);
	});

	it(' should close', () => {
		prevState.state = prevState.state.set('opened', prevState.state.get('opened').push(path));

		expect(prevState.state.get('opened').size).toBe(1);
		expect(prevState.state.get('opened').first()).toEqual(path);

		const newState = toggleState(prevState, { isOpened: true, jsonpath: path });
		expect(newState.get('opened').size).toBe(0);
	});
});

describe('select', () => {
	it('should highlight', () => {
		const prevState = { state: DEFAULT_STATE };
		prevState.state = selectWrapper(prevState, { jsonpath: path });

		expect(prevState.state.get('selectedJsonpath')).toEqual(path);
	});
});
