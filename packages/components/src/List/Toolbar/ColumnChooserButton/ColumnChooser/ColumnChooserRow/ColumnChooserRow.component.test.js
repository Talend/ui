import { render } from '@testing-library/react';

import Component from './ColumnChooserRow.component';

describe('ColumnChooserRow', () => {
	it('should render', () => {
		// given
		const id = 'row-renderer-context-id';
		const Children = () => <div id="my-child">Hello World</div>;
		// when
		const { container } = render(
			<Component id={id}>
				<Children />
			</Component>,
		);
		// then
		expect(container.firstChild).toMatchSnapshot();
	});
});
