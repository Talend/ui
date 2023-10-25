import { render } from '@testing-library/react';
import Container, { getIcon } from './RecordsViewer.container';
jest.unmock('@talend/design-system');

describe('RecordsViewer', () => {
	it('should render recordsViewer', () => {
		const { container } = render(<Container sample={{ data: [{ data: 'foo' }] }} />);
		expect(container.firstChild).toMatchSnapshot();
	});
});

describe('getIcon', () => {
	it('should return the plus circle and icon class', () => {
		expect(getIcon()).toEqual({
			className: 'theme-tc-records-viewer-branch-icon tc-records-viewer-branch-icon',
			name: 'talend-plus-circle',
		});
	});
	it('should return the minus circle and icon class', () => {
		expect(getIcon(true)).toEqual({
			className: 'theme-tc-records-viewer-branch-icon tc-records-viewer-branch-icon',
			name: 'talend-minus-circle',
		});
	});
});
