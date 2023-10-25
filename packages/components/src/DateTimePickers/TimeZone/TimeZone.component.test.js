/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { render } from '@testing-library/react';

import TimeZone from './TimeZone.component';

jest.unmock('@talend/design-system');

describe('TimeZone', () => {
	it('should render', () => {
		// when
		const { container } = render(<TimeZone timezone="Asia/Beijing" />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});
});
