import React from 'react';
import { shallow } from 'enzyme';
import ColumnChooserButton from './ColumnChooserButton.component';

describe('ColumnChooserButton', () => {
	it('should return the component (shallow mode)', () => {
		// given
		const id = 'myIdColumnChooserId';
		const columns = [
			{
				label: 'col1',
				order: 1,
				locked: false,
				hidden: false,
			},
			{
				label: 'col2',
				order: 2,
				locked: false,
				hidden: false,
			},
		];
		const submitColumnChooser = jest.fn();
		// when
		const wrapper = shallow(
			<ColumnChooserButton id={id} columns={columns} submitColumnChooser={submitColumnChooser} />,
		);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
