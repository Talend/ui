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
				order: 1,
				locked: false,
				hidden: false,
			},
		];
		const handlerColumnChooser = jest.fn();
		// when
		const wrapper = shallow(
			<ColumnChooserButton id={id} columns={columns} handlerColumnChooser={handlerColumnChooser} />,
		);
		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
