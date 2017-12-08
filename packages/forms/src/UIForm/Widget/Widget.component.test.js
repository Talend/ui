import React from 'react';
import { shallow } from 'enzyme';

import Widget from './Widget.component';

describe('Widget component', () => {
	const schema = {
		key: ['user', 'firstname'],
		type: 'text',
	};
	const errors = {
		'user,firstname': 'This is not ok',
	};
	const properties = {
		user: {
			firstname: 'my firstname',
			lastname: 'my lastname',
		},
		comment: '',
	};

	it('should render widget', () => {
		// when
		const wrapper = shallow(
			<Widget
				formName={'myForm'}
				onChange={jest.fn('onChange')}
				onFinish={jest.fn('onFinish')}
				onTrigger={jest.fn('onTrigger')}
				properties={properties}
				schema={schema}
				errors={errors}
			/>,
		);

		// then
		expect(wrapper.getNode()).toMatchSnapshot();
	});

	it('should render nothing if widget does not exist', () => {
		// given
		const unknownWidgetSchema = {
			...schema,
			type: 'unknown',
		};

		// when
		const wrapper = shallow(
			<Widget properties={properties} schema={unknownWidgetSchema} errors={errors} />,
		);

		// then
		expect(wrapper.getNode()).toMatchSnapshot();
	});

	it('should render custom widget', () => {
		// given
		const widgets = {
			customWidget() {
				return <div>my widget</div>;
			},
		};
		const customWidgetSchema = {
			...schema,
			type: 'customWidget',
		};

		// when
		const wrapper = shallow(
			<Widget
				formName={'myForm'}
				onChange={jest.fn('onChange')}
				onTrigger={jest.fn('onTrigger')}
				properties={properties}
				schema={customWidgetSchema}
				errors={errors}
				widgets={widgets}
			/>,
		);

		// then
		expect(wrapper.getNode()).toMatchSnapshot();
	});

	it('should pass validation message from schema over message from errors', () => {
		// given
		const customValidationMessageSchema = {
			...schema,
			validationMessage: 'My custom validation message',
		};

		// when
		const wrapper = shallow(
			<Widget
				formName={'myForm'}
				onChange={jest.fn('onChange')}
				onTrigger={jest.fn('onTrigger')}
				properties={properties}
				schema={customValidationMessageSchema}
				errors={errors}
			/>,
		);

		// then
		expect(wrapper.props().errorMessage).toBe('My custom validation message');
	});

	it('should pass message from errors when there is no validation message in schema', () => {
		// when
		const wrapper = shallow(
			<Widget
				formName={'myForm'}
				onChange={jest.fn('onChange')}
				onTrigger={jest.fn('onTrigger')}
				properties={properties}
				schema={schema}
				errors={errors}
			/>,
		);

		// then
		expect(wrapper.node.props.errorMessage).toBe('This is not ok');
	});
	it("should render null if widgetId is 'hidden'", () => {
		// when
		const hidden = { ...schema, widget: 'hidden' };
		const wrapper = shallow(<Widget schema={hidden} />);

		// then
		expect(wrapper.getNode()).toBe(null);
	});
});
