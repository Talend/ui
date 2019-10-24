import React from 'react';
import { shallow } from 'enzyme';
import TooltipTrigger from '@talend/react-components/lib/TooltipTrigger';

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
	const customWidgets = {
		customWidget: () => <div>my widget</div>,
		customWidget_text: () => <div>my widget in text display mode</div>,
	};

	it('should render widget', () => {
		// when
		const wrapper = shallow(
			<Widget
				id={'myForm'}
				onChange={jest.fn('onChange')}
				onFinish={jest.fn('onFinish')}
				onTrigger={jest.fn('onTrigger')}
				properties={properties}
				schema={schema}
				errors={errors}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should wrapper widget into a tooltip trigger', () => {
		const wrapper = shallow(
			<Widget
				id={'myForm'}
				onChange={jest.fn('onChange')}
				onFinish={jest.fn('onFinish')}
				onTrigger={jest.fn('onTrigger')}
				properties={properties}
				schema={{ ...schema, tooltip: 'example tooltip' }}
				errors={errors}
			/>,
		);

		expect(wrapper.getElement().type).toBe(TooltipTrigger);
	});

	it('should render widget with the specific displayMode', () => {
		// when
		const wrapper = shallow(
			<Widget
				id={'myForm'}
				onChange={jest.fn('onChange')}
				onFinish={jest.fn('onFinish')}
				onTrigger={jest.fn('onTrigger')}
				properties={properties}
				schema={schema}
				errors={errors}
				displayMode={'text'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
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
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render custom widget', () => {
		// given
		const customWidgetSchema = {
			...schema,
			type: 'customWidget',
		};

		// when
		const wrapper = shallow(
			<Widget
				id={'myForm'}
				onChange={jest.fn('onChange')}
				onTrigger={jest.fn('onTrigger')}
				properties={properties}
				schema={customWidgetSchema}
				errors={errors}
				widgets={customWidgets}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render custom widget in specific display mode', () => {
		// given
		const customWidgetSchema = {
			...schema,
			type: 'customWidget',
		};

		// when
		const wrapper = shallow(
			<Widget
				id={'myForm'}
				onChange={jest.fn('onChange')}
				onTrigger={jest.fn('onTrigger')}
				properties={properties}
				schema={customWidgetSchema}
				errors={errors}
				widgets={customWidgets}
				displayMode={'text'}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
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
				id={'myForm'}
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
				id={'myForm'}
				onChange={jest.fn('onChange')}
				onTrigger={jest.fn('onTrigger')}
				properties={properties}
				schema={schema}
				errors={errors}
			/>,
		);

		// then
		expect(wrapper.props().errorMessage).toBe('This is not ok');
	});

	it("should render null when widgetId is 'hidden'", () => {
		// when
		const hidden = { ...schema, widget: 'hidden' };
		const wrapper = shallow(<Widget schema={hidden} />);

		// then
		expect(wrapper.getElement()).toBe(null);
	});

	it('should render widget when conditions are met', () => {
		// when
		const withConditions = {
			...schema,
			condition: {
				and: [
					{ in: [{ var: 'user.firstname' }, ['toto', 'my firstname']] },
					{ '==': [{ var: 'user.lastname' }, 'my lastname'] },
				],
			},
		};
		const wrapper = shallow(
			<Widget schema={withConditions} properties={properties} errors={errors} />,
		);

		// then
		expect(wrapper.getElement()).not.toBe(null);
	});

	it('should render null when conditions are not met', () => {
		// when
		const withConditions = {
			...schema,
			condition: {
				and: [
					{ in: [{ var: 'user.firstname' }, ['toto', 'my firstname']] },
					{ '==': [{ var: 'user.lastname' }, 'my lastname is not here'] },
				],
			},
		};
		const wrapper = shallow(
			<Widget schema={withConditions} properties={properties} errors={errors} />,
		);

		// then
		expect(wrapper.getElement()).toBe(null);
	});

	it('should pass value updating status', () => {
		// when
		const wrapper = shallow(
			<Widget
				id={'myForm'}
				onChange={jest.fn('onChange')}
				onFinish={jest.fn('onFinish')}
				onTrigger={jest.fn('onTrigger')}
				properties={properties}
				schema={schema}
				errors={errors}
				displayMode={'text'}
				updating={[schema.key.join('.')]}
			/>,
		);

		// then
		expect(wrapper.prop('valueIsUpdating')).toBe(true);
	});
});
