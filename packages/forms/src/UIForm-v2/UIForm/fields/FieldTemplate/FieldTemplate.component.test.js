import React from 'react';
import { shallow } from 'enzyme';

import FieldTemplate from './FieldTemplate.component';

describe('FieldTemplate', () => {
	it('should render with label before', () => {
		// when
		const wrapper = shallow(
			<FieldTemplate
				isValid
				description={'My awesome description'}
				descriptionId={'myAwesomeField-description'}
				errorId={'myAwesomeField-error'}
				errorMessage={'This is wrong o_o'}
				id={'myAwesomeField'}
				label={'My awesome label'}
			>
				<input id={'myAwesomeField'} />
			</FieldTemplate>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render with label after', () => {
		// when
		const wrapper = shallow(
			<FieldTemplate
				isValid
				description={'My awesome description'}
				descriptionId={'myAwesomeField-description'}
				errorId={'myAwesomeField-error'}
				errorMessage={'This is wrong o_o'}
				id={'myAwesomeField'}
				label={'My awesome label'}
				labelAfter
			>
				<input id={'myAwesomeField'} />
			</FieldTemplate>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render invalid className', () => {
		// when
		const wrapper = shallow(
			<FieldTemplate
				isValid={false}
				description={'My awesome description'}
				descriptionId={'myAwesomeField-description'}
				errorId={'myAwesomeField-error'}
				errorMessage={'This is wrong o_o'}
				id={'myAwesomeField'}
				label={'My awesome label'}
			>
				<input id={'myAwesomeField'} />
			</FieldTemplate>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should add animation on value with updating status', () => {
		// when
		const wrapper = shallow(
			<FieldTemplate
				isValid={false}
				description={'My awesome description'}
				descriptionId={'myAwesomeField-description'}
				errorId={'myAwesomeField-error'}
				errorMessage={'This is wrong o_o'}
				id={'myAwesomeField'}
				label={'My awesome label'}
				valueIsUpdating
			>
				<input id={'myAwesomeField'} />
			</FieldTemplate>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
