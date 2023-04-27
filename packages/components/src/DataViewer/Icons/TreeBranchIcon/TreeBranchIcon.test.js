import { render, screen } from '@testing-library/react';
import Component, { getDefaultIcon } from './TreeBranchIcon.component';
jest.unmock('@talend/design-system');
jest.mock('react-i18next', () => {
	// eslint-disable-next-line global-require
	const mockTranslations = require('../../../../test/i18nMock').default;

	return mockTranslations();
});

describe('getDefaultIcon', () => {
	it('should return a custom object icon', () => {
		const myIcon = getDefaultIcon({
			useCustomIcon: true,
			getIcon: () => ({
				myIcon: 'myIcon',
				iconClassName: 'myIconClassName',
			}),
		});
		expect(myIcon).toEqual({ myIcon: 'myIcon', iconClassName: 'myIconClassName' });
	});
	it('should return an opened icon', () => {
		const myIcon = getDefaultIcon({ opened: true });
		expect(myIcon).toEqual({ name: 'talend-caret-down' });
	});
	it('should return a closed icon', () => {
		const myIcon = getDefaultIcon({ opened: false });
		expect(myIcon).toEqual({ name: 'talend-chevron-left' });
	});
});

describe('TreeBranchIcon', () => {
	it('should render an opened icon', () => {
		render(
			<Component
				dataKey="myDataKey"
				jsonpath="myJsonPath"
				onToggle={jest.fn()}
				opened
				value={{ value: 'myValue' }}
			/>,
		);
		expect(screen.getByTestId('tree-branch-icon')).toBeVisible();
		expect(screen.getByTitle('Collapse myDataKey (myJsonPath)')).toBeVisible();
	});
	it('should render an closed icon', () => {
		render(
			<Component
				dataKey="myDataKey"
				jsonpath="myJsonPath"
				onToggle={jest.fn()}
				opened={false}
				value={{ value: 'myValue' }}
			/>,
		);
		const icon = screen.getByTitle('Expand myDataKey (myJsonPath)');
		expect(icon).toHaveAttribute('name', 'talend-chevron-left');
	});
});
