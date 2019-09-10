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

describe('Datalist component in text display mode', () => {
	it('should render', () => {
		// when
		const wrapper = shallow(
			<DatalistTextMode.WrappedComponent id={'my-datalist'} schema={schema} value={'foo'} />,
		);

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
		wrapper = mount(<DatalistTextMode {...props} value={'foo'} />);

		// then
		expect(props.onTrigger).toBeCalledWith(null, {
			trigger: props.schema.triggers[0],
			schema: props.schema,
			errors: props.errors,
			properties: props.properties,
		});
		expect(wrapper.find('dd').text()).toBe('foo (loading labels)');
	});
});
