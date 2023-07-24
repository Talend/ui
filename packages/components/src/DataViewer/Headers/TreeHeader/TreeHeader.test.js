import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Component from './TreeHeader.component';

jest.mock('react-i18next', () => {
	// eslint-disable-next-line global-require
	const mockTranslations = require('../../../../test/i18nMock').default;

	return mockTranslations();
});

describe('TreeHeader', () => {
	it('should render a simple tree header', () => {
		const { container } = render(<Component title="myTitle" />);
		expect(screen.getByText('myTitle')).toBeVisible();
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should render with the collapse button', async () => {
		const onClickCollapseAll = jest.fn();
		render(<Component title="myTitle" onClickCollapseAll={onClickCollapseAll} />);
		expect(screen.getByTestId('collapse-all')).toBeVisible();
		await userEvent.click(screen.getByTestId('collapse-all'));
		expect(onClickCollapseAll).toHaveBeenCalled();
	});
	it('should render with the expand button', async () => {
		const onClickExpandAll = jest.fn();
		render(<Component title="myTitle" onClickExpandAll={onClickExpandAll} />);
		expect(screen.getByTestId('expand-all')).toBeVisible();
		await userEvent.click(screen.getByTestId('expand-all'));
		expect(onClickExpandAll).toHaveBeenCalled();
	});
	it('should render other actions', () => {
		const otherActions = () => <div>MyOtherActions</div>;
		render(<Component title="myTitle" otherActions={otherActions} />);
		expect(screen.getByText('MyOtherActions')).toBeVisible();
	});
});
