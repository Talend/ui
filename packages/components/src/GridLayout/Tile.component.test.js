import React from 'react';
import { shallow, mount } from 'enzyme';

import Tile from './Tile.component';

function SimpleContent({ label }) {
	return (
		<span>{label}</span>
	);
}

describe('Grid tiles', () => {
	it('should compute tile without header', () => {
		// given
		const props = {
			content: { component: SimpleContent },
			contentProps: { label: 'short sentence' },
		};

		// when
		const wrapper = shallow(<Tile {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
		// expect(wrapper.getElement()).toHaveLength(1);
	});
	it('should compute tile with actions in header', () => {
		// given
		const addItemAction = {
			label: 'Add item',
			icon: 'talend-plus',
			id: 'add',
			onClick: jest.mock(),
		};
		const props = {
			content: { component: SimpleContent },
			contentProps: { label: 'short sentence' },
			header: {
				label: 'Short sentence tile',
				rightActions: [addItemAction],
			},
		};

		// when
		const wrapper = shallow(<Tile {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
		// expect(wrapper.getElement()).toHaveLength(1);
	});
});
