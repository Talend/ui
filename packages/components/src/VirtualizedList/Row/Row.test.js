import React from 'react';
import { shallow } from 'enzyme';
import RowRenderer from './Row.component';

describe('RowRenderer', () => {
	it('should show a skeleton during the scroll', () => {
		// when
		const wrapper = shallow(
			<RowRenderer
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

	it('should show the rowRenderer', () => {
		// when
		const wrapper = shallow(
			<RowRenderer
				className={'my-class-names'}
				index={1}
				key={18}
				parent={{}}
				rowRenderer={<div />}
				style={{ background: 'red' }}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	it('should not update the component when is scrolling', () => {
		const DefaultRowRenderer = () => (<div />);
		const rowRenderer = new RowRenderer();
		rowRenderer.props = {
			isScrolling: false,
			rowRenderer: DefaultRowRenderer,
		};

		// when
		const shouldUpdate = rowRenderer.shouldComponentUpdate({ isScrolling: true });

		// then
		expect(shouldUpdate).toBeFalsy();
	});

	it('should update the component when is scrolling', () => {
		const DefaultRowRenderer = () => (<div />);
		const rowRenderer = new RowRenderer();
		rowRenderer.props = {
			isScrolling: true,
			rowRenderer: DefaultRowRenderer,
		};

		// when
		const shouldUpdate = rowRenderer.shouldComponentUpdate({ isScrolling: false });

		// then
		expect(shouldUpdate).toBeTruthy();
	});
});
