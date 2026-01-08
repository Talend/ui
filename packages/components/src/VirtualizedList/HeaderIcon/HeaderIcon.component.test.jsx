import { render } from '@testing-library/react';
import HeaderIcon from './HeaderIcon.component';

describe('HeaderIcon', () => {
	it('should render the header when there is no sort', () => {
		// given
		const props = {
			columnData: { iconName: 'talend-test' },
			label: 'test',
			sortBy: 'test',
			dataKey: 'test',
			sortDirection: 'DESC',
		};
		// when
		const { container } = render(<HeaderIcon {...props} />);
		// then
		expect(container.firstChild).toMatchSnapshot();
	});
});
