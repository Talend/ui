import { render } from '@testing-library/react';
import Container, { getIcon } from './RecordsViewer.container';

describe('RecordsViewer', () => {
	it('should render recordsViewer', () => {
		const { container } = render(<Container sample={{ data: [{ data: 'foo' }] }} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});

describe('getIcon', () => {
	it('should return the plus circle and icon class', () => {
		expect(getIcon()).toMatchObject({
			className: expect.stringContaining('tc-records-viewer-branch-icon'),
			name: 'talend-plus-circle',
		});
	});
	it('should return the minus circle and icon class', () => {
		expect(getIcon(true)).toMatchObject({
			className: expect.stringContaining('tc-records-viewer-branch-icon'),
			name: 'talend-minus-circle',
		});
	});
});
