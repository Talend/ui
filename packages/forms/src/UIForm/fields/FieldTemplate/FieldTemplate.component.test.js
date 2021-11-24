import React from 'react';
import { shallow } from 'enzyme';

import FieldTemplate from './FieldTemplate.component';

describe('FieldTemplate', () => {
	const defaultProps = {
		isValid: true,
		description: 'My awesome description',
		descriptionId: 'myAwesomeField-description',
		errorId: 'myAwesomeField-error',
		errorMessage: 'This is wrong o_o',
		id: 'myAwesomeField',
		label: 'My awesome label',
	};

	it('should render with label before', () => {
		// when
		const wrapper = shallow(
			<FieldTemplate {...defaultProps}>
				<input id="myAwesomeField" />
			</FieldTemplate>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render with label after', () => {
		// when
		const wrapper = shallow(
			<FieldTemplate {...defaultProps} labelAfter>
				<input id="myAwesomeField" />
			</FieldTemplate>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render with hint', () => {
		const tooltipContent = (
			<span>Tooltip content, which helps to understand what is the purpose of this field</span>
		);

		// when
		const wrapper = shallow(
			<FieldTemplate
				{...defaultProps}
				hint={{
					overlayComponent: tooltipContent,
					overlayPlacement: 'top',
				}}
			>
				<input id="myAwesomeField" />
			</FieldTemplate>,
		);

		// then
		expect(wrapper.find('OverlayTrigger').getElement()).toMatchSnapshot();
	});

	it('should render invalid className', () => {
		// when
		const wrapper = shallow(
			<FieldTemplate {...defaultProps} isValid={false}>
				<input id="myAwesomeField" />
			</FieldTemplate>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should add animation on value with updating status', () => {
		// when
		const wrapper = shallow(
			<FieldTemplate {...defaultProps} isValid={false} valueIsUpdating>
				<input id="myAwesomeField" />
			</FieldTemplate>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should pass label props to the label', () => {
		// when
		const wrapper = shallow(
			<FieldTemplate {...defaultProps} labelProps={{ className: 'custom-label-class' }}>
				<input id="myAwesomeField" />
			</FieldTemplate>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
