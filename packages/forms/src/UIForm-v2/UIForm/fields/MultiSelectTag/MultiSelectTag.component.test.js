import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import Badge from '@talend/react-components/lib/Badge';
import Typeahead from '@talend/react-components/lib/Typeahead';
import keycode from 'keycode';
import MultiSelectTag from './MultiSelectTag.component';

describe('MultiSelectTag field', () => {
	const props = {
		id: 'my-select-tag',
		isValid: true,
		errorMessage: 'This is wrong',
		onChange: jest.fn(),
		onFinish: jest.fn(),
		onTrigger: jest.fn(),
		schema: {
			autoFocus: true,
			description: 'This is the MultiSelectTag field',
			disabled: false,
			placeholder: 'Type here',
			readOnly: false,
			required: true,
			restricted: false,
			title: 'Tags',
			titleMap: [{ name: 'toto', value: 'titi' }, { name: 'tata', value: 'tutu' }],
		},
		value: ['aze', 'tutu'],
	};

	it('should render MultiSelectTag', () => {
		// when
		const wrapper = shallow(<MultiSelectTag {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should update suggestion on input change', () => {
		// given
		const wrapper = mount(<MultiSelectTag {...props} />);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('change', { target: { value: 'titi' } });

		// then
		expect(wrapper.find(Typeahead).props().items).toEqual([{ title: 'titi (new)', value: 'titi' }]);
	});

	it('should update suggestion on props.value change', () => {
		// given
		const node = document.createElement('div');
		// eslint-disable-next-line react/no-render-return-value
		const instance = ReactDOM.render(<MultiSelectTag {...props} />, node);
		instance.updateSuggestions();
		expect(instance.state.suggestions).toEqual([{ title: 'toto', value: 'titi' }]);

		// when : trigger a props update
		ReactDOM.render(<MultiSelectTag {...props} value={['aze']} />, node);

		// then
		expect(instance.state.suggestions).toEqual([
			{ title: 'toto', value: 'titi' },
			{ title: 'tata', value: 'tutu' },
		]);
	});

	it('should suggest new item creation when widget is not restricted', () => {
		// given
		const wrapper = mount(<MultiSelectTag {...props} />);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('change', { target: { value: 'az' } });

		// then
		expect(wrapper.find(Typeahead).props().items).toEqual([{ title: 'az (new)', value: 'az' }]);
	});

	it('should NOT suggest new item creation when widget is restricted', () => {
		// given
		const restrictedSchema = { ...props.schema, restricted: true };
		const wrapper = mount(<MultiSelectTag {...props} schema={restrictedSchema} />);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('change', { target: { value: 'az' } });

		// then
		expect(wrapper.find(Typeahead).props().items).toEqual([]);
	});

	it('should NOT suggest new item creation when a value already matches', () => {
		// given
		const wrapper = mount(<MultiSelectTag {...props} value={['az']} />);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('change', { target: { value: 'az' } });

		// then
		expect(wrapper.find(Typeahead).props().items).toEqual([]);
	});

	it('should NOT suggest new item creation when a suggestion matches', () => {
		// given
		const wrapper = mount(<MultiSelectTag {...props} />);

		// when
		wrapper
			.find('input')
			.at(0)
			.simulate('change', { target: { value: 'toto' } });

		// then
		expect(wrapper.find(Typeahead).props().items).toEqual([{ title: 'toto', value: 'titi' }]);
	});

	it('should add tag', () => {
		// given
		const onChange = jest.fn();
		const onFinish = jest.fn();
		const wrapper = mount(<MultiSelectTag {...props} onChange={onChange} onFinish={onFinish} />);
		const input = wrapper.find('input').at(0);

		// when
		input.simulate('change', { target: { value: 'titi' } });
		input.simulate('keydown', { which: keycode.codes.enter });

		// then
		const payload = { schema: props.schema, value: props.value.concat('titi') };
		expect(onChange).toBeCalledWith(expect.anything(), payload);
		expect(onFinish).toBeCalledWith(expect.anything(), payload);
	});

	it('should remove tag', () => {
		// given
		const onChange = jest.fn();
		const onFinish = jest.fn();
		const wrapper = mount(<MultiSelectTag {...props} onChange={onChange} onFinish={onFinish} />);

		// when
		wrapper
			.find('Button.tc-badge-delete-icon')
			.at(0)
			.simulate('click');

		// then
		const payload = { schema: props.schema, value: props.value.slice(1) };
		expect(onChange).toBeCalledWith(expect.anything(), payload);
		expect(onFinish).toBeCalledWith(expect.anything(), payload);
	});

	it('should call onTrigger on focus', done => {
		// given
		const data = { titleMap: [{ name: 'Foo', value: 'foo' }] };
		const triggerProps = {
			...props,
			onTrigger: jest.fn(
				event =>
					new Promise(resolve => {
						// hack: to be sure we catch the setState after the promise
						setTimeout(() => {
							expect(event.target.state.isLoading).toBe(false);
							done();
						}, 0);
						return resolve(data);
					}),
			),
			schema: {
				...props.schema,
				triggers: [
					{
						onEvent: 'focus',
					},
				],
			},
		};
		const wrapper = shallow(<MultiSelectTag {...triggerProps} />);
		const event = { type: 'focus', target: wrapper.instance() };

		// when
		wrapper
			.find('FieldTemplate')
			.find(Typeahead)
			.prop('onFocus')(event);

		// then
		expect(triggerProps.onTrigger).toBeCalledWith(event, {
			trigger: triggerProps.schema.triggers[0],
			schema: triggerProps.schema,
			errors: triggerProps.errors,
			properties: triggerProps.properties,
		});
		expect(wrapper.state('isLoading')).toBe(true);
	});

	it('should call onTrigger on focus', () => {
		// given
		const nameResolverProps = {
			...props,
			resolveName: value => value.map(next => `${next}_name`),
		};
		const wrapper = shallow(<MultiSelectTag {...nameResolverProps} />);

		// when
		const firstLabel = wrapper
			.find('FieldTemplate')
			.find(Badge)
			.first()
			.prop('label');

		// then
		expect(firstLabel).toBe('aze_name');
	});
});
