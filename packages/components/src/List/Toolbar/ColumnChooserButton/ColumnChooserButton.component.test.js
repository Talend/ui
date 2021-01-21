import React from 'react';
import { mount } from 'enzyme';
import ColumnChooserButton from './ColumnChooserButton.component';

const columns = [
	{ hidden: undefined, label: 'col1', locked: true, order: 1 },
	{ hidden: undefined, label: 'col2', locked: true, order: 2 },
	{ hidden: undefined, label: 'col3', order: 3 },
	{ hidden: undefined, label: 'col4', order: 4 },
	{ hidden: true, label: 'col5', order: 5 },
	{ hidden: undefined, label: 'col6', order: 6 },
];

describe('ColumnChooserButton', () => {
	it('should render the button', () => {
		// given
		const props = {
			id: 'my-wrapper-id',
			columns,
			submit: jest.fn(),
		};
		// when
		const wrapper = mount(<ColumnChooserButton {...props} />);
		// then
		expect(wrapper.find('svg.tc-icon-name-talend-column-chooser')).toHaveLength(1);
		expect(wrapper.find('button#my-wrapper-id-button')).toHaveLength(1);
	});
});
