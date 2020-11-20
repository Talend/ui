import React from 'react';
import { mount } from 'enzyme';
import TooltipTrigger from '@talend/react-components/lib/TooltipTrigger';
import defaultWidgets from '../utils/widgets';
import { WidgetContext } from '../context';

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
		const wrapper = mount(
			<WidgetContext.Provider value={defaultWidgets}>
				<Widget
					id="myForm"
					onChange={jest.fn('onChange')}
					onFinish={jest.fn('onFinish')}
					onTrigger={jest.fn('onTrigger')}
					properties={properties}
					schema={schema}
					errors={errors}
				/>
			</WidgetContext.Provider>,
		);

		// then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should wrapper widget into a tooltip trigger', () => {
		const wrapper = mount(
			<WidgetContext.Provider value={defaultWidgets}>
				<Widget
					id="myForm"
					onChange={jest.fn('onChange')}
					onFinish={jest.fn('onFinish')}
					onTrigger={jest.fn('onTrigger')}
					properties={properties}
					schema={{ ...schema, tooltip: 'example tooltip' }}
					errors={errors}
				/>
			</WidgetContext.Provider>,
		);
		expect(wrapper.find(TooltipTrigger)).toBeDefined();
	});

	it('should render widget with the specific displayMode', () => {
		// when
		const wrapper = mount(
			<WidgetContext.Provider value={defaultWidgets}>
				<Widget
					id="myForm"
					onChange={jest.fn('onChange')}
					onFinish={jest.fn('onFinish')}
					onTrigger={jest.fn('onTrigger')}
					properties={properties}
					schema={schema}
					errors={errors}
					displayMode="text"
				/>
			</WidgetContext.Provider>,
		);

		// then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render nothing if widget does not exist', () => {
		// given
		const unknownWidgetSchema = {
			...schema,
			type: 'unknown',
		};

		// when
		const wrapper = mount(
			<WidgetContext.Provider value={defaultWidgets}>
				<Widget properties={properties} schema={unknownWidgetSchema} errors={errors} />
			</WidgetContext.Provider>,
		);

		// then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render custom widget', () => {
		// given
		const customWidgetSchema = {
			...schema,
			type: 'customWidget',
		};

		// when
		const wrapper = mount(
			<WidgetContext.Provider value={{ ...defaultWidgets, ...customWidgets }}>
				<Widget
					id="myForm"
					onChange={jest.fn('onChange')}
					onFinish={jest.fn('onFinish')}
					onTrigger={jest.fn('onTrigger')}
					properties={properties}
					schema={customWidgetSchema}
					errors={errors}
					value={customWidgets}
				/>
			</WidgetContext.Provider>,
		);

		// then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render custom widget in specific display mode', () => {
		// given
		const customWidgetSchema = {
			...schema,
			type: 'customWidget',
		};

		// when
		const wrapper = mount(
			<WidgetContext.Provider value={{ ...defaultWidgets, ...customWidgets }}>
				<Widget
					id="myForm"
					onChange={jest.fn('onChange')}
					onFinish={jest.fn('onFinish')}
					onTrigger={jest.fn('onTrigger')}
					properties={properties}
					schema={customWidgetSchema}
					errors={errors}
					value={customWidgets}
					displayMode="text"
				/>
			</WidgetContext.Provider>,
		);

		// then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should pass validation message from schema over message from errors', () => {
		// given
		const customValidationMessageSchema = {
			...schema,
			validationMessage: 'My custom validation message',
		};

		// when
		const wrapper = mount(
			<WidgetContext.Provider value={defaultWidgets}>
				<Widget
					id="myForm"
					onChange={jest.fn('onChange')}
					onFinish={jest.fn('onFinish')}
					onTrigger={jest.fn('onTrigger')}
					properties={properties}
					schema={customValidationMessageSchema}
					errors={errors}
				/>
			</WidgetContext.Provider>,
		);

		// then
		expect(wrapper.find('[role="status"]').text()).toBe('My custom validation message');
	});

	it('should pass message from errors when there is no validation message in schema', () => {
		// when
		const wrapper = mount(
			<WidgetContext.Provider value={defaultWidgets}>
				<Widget
					id="myForm"
					onChange={jest.fn('onChange')}
					onFinish={jest.fn('onFinish')}
					onTrigger={jest.fn('onTrigger')}
					properties={properties}
					schema={schema}
					errors={errors}
				/>
			</WidgetContext.Provider>,
		);

		// then
		expect(wrapper.find('[role="status"]').text()).toBe('This is not ok');
	});

	it("should render null when widgetId is 'hidden'", () => {
		// when
		const hidden = { ...schema, widget: 'hidden' };
		const wrapper = mount(
			<WidgetContext.Provider value={defaultWidgets}>
				<Widget schema={hidden} />
			</WidgetContext.Provider>,
		);

		// then
		expect(wrapper.html()).toBe(null);
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
		const wrapper = mount(
			<WidgetContext.Provider value={defaultWidgets}>
				<Widget
					schema={withConditions}
					properties={properties}
					errors={errors}
					onChange={jest.fn('onChange')}
					onFinish={jest.fn('onFinish')}
				/>
				,
			</WidgetContext.Provider>,
		);

		// then
		expect(wrapper.find('input#user_firstname').length).toBe(1);
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
		const wrapper = mount(
			<WidgetContext.Provider value={defaultWidgets}>
				<Widget
					schema={withConditions}
					properties={properties}
					errors={errors}
					onChange={jest.fn('onChange')}
					onFinish={jest.fn('onFinish')}
				/>
			</WidgetContext.Provider>,
		);

		// then
		expect(wrapper.html()).toBe(null);
	});

	it('should pass value updating status', () => {
		// when
		const wrapper = mount(
			<WidgetContext.Provider value={defaultWidgets}>
				<Widget
					id="myForm"
					onChange={jest.fn('onChange')}
					onFinish={jest.fn('onFinish')}
					onTrigger={jest.fn('onTrigger')}
					properties={properties}
					schema={schema}
					errors={errors}
					updating={[schema.key.join('.')]}
				/>
			</WidgetContext.Provider>,
		);

		// then
		expect(wrapper.find('.form-group.theme-updating').length).toBe(1);
	});
});
