import React from 'react';
import { shallow } from 'enzyme';

import RowRenderer from './Row.component';

describe('RowRenderer', () => {
	it('should show a skeleton during the scroll', () => {
		const Row = new RowRenderer({
			selectionToggle: null,
		});

		// when
		const wrapper = shallow(
			<Row
				className={'my-class-names'}
				index={1}
				key={18}
				parent={{}}
				style={{ background: 'red' }}
				isScrolling
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should show a RowSelectionRenderer if the row is selected', () => {
		// given
		const Row = new RowRenderer({
			selectionToggle: () => {},
			isSelected: () => {},
		});

		// when
		const wrapper = shallow(
			<Row
				className={'my-class-names'}
				index={1}
				key={18}
				parent={{}}
				style={{ background: 'red' }}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should show a DefaultTableRowRenderer by default', () => {
		const Row = new RowRenderer({
			selectionToggle: null,
		});

		// when
		const wrapper = shallow(
			<Row
				className={'my-class-names'}
				index={1}
				key={18}
				parent={{}}
				style={{ background: 'red' }}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});
});
