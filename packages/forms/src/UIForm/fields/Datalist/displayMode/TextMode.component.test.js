import React from 'react';
import { shallow, mount } from 'enzyme';
import DatalistTextMode from './TextMode.component';

const schema = {
	title: 'My List',
	titleMap: [
		{ name: 'Foo', value: 'foo' },
		{ name: 'Bar', value: 'bar' },
		{ name: 'Lol', value: 'lol' },
	],
	type: 'string',
	schema: {
		type: 'string',
	},
};
const schemaWithGroups = {
	title: 'Datalist with groups',
	type: 'string',
	schema: {
		type: 'string',
	},
	options: {
		isMultiSection: true,
		titleMap: [
			{ title: 'Foo group', suggestions: [{ name: 'Foo', value: 'foo' }] },
			{ title: 'Bar group', suggestions: [{ name: 'Bar', value: 'bar' }] },
			{ title: 'Lol group', suggestions: [{ name: 'Lol', value: 'lol' }] },
		],
	},
};

jest.mock('ally.js/style/_style');

describe('Datalist component in text display mode', () => {
	it('should render', () => {
		// when
		const wrapper = shallow(<DatalistTextMode id="my-datalist" schema={schema} value="foo" />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should call onTrigger on mount', done => {
		// given
		let wrapper;
		const data = { titleMap: [{ name: 'Foo', value: 'foo' }] };
		const props = {
			onTrigger: jest.fn(
				() =>
					new Promise(resolve => {
						// hack: to be sure we catch the setState after the promise
						setTimeout(() => {
							expect(wrapper.find('dd').text()).toBe('Foo');
							done();
						}, 0);
						return resolve(data);
					}),
			),
			schema: {
				type: 'string',
				schema: {
					type: 'string',
				},
				triggers: [
					{
						onEvent: 'focus',
					},
				],
			},
		};

		// when
		wrapper = mount(<DatalistTextMode {...props} value="foo" />);

		// then
		expect(props.onTrigger).toBeCalledWith(null, {
			trigger: props.schema.triggers[0],
			schema: props.schema,
			errors: props.errors,
			properties: props.properties,
		});
		expect(wrapper.find('dd').text()).toBe('foo (loading labels)');
	});
	it('should show name in text mode when have groups', () => {
		// when
		const wrapper = mount(
			<DatalistTextMode id="my-datalist-with-groups" schema={schemaWithGroups} value="foo" />,
		);

		// then
		expect(wrapper.find('dd').text()).toBe('Foo');
	});
});
