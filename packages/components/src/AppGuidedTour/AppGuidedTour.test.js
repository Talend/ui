import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppGuidedTour, { DEFAULT_LOCAL_STORAGE_KEY } from './AppGuidedTour.component';

jest.unmock('@talend/design-system');

const DEFAULT_PROPS = {
	appName: 'app name',
	isOpen: true,
	localStorageKey: DEFAULT_LOCAL_STORAGE_KEY,
	steps: [],
	demoContentSteps: [],
	onImportDemoContent: () => {},
	onRequestClose: () => {},
	onRequestOpen: () => {},
};

describe('AppGuidedTour', () => {
	beforeEach(() => {
		localStorage.setItem(DEFAULT_LOCAL_STORAGE_KEY, null);
	});
	it('should not trigger import function if "load demo content" is not selected', async () => {
		const onImportDemoContentMock = jest.fn();
		render(<AppGuidedTour {...DEFAULT_PROPS} onImportDemoContent={onImportDemoContentMock} />);

		await userEvent.click(screen.getByLabelText('Import demo content'));
		await userEvent.click(screen.getByText('Let me try'));
		expect(onImportDemoContentMock).not.toHaveBeenCalled();
	});
	it('should trigger import function if "load demo content" is selected', async () => {
		const onImportDemoContentMock = jest.fn();

		render(<AppGuidedTour {...DEFAULT_PROPS} onImportDemoContent={onImportDemoContentMock} />);
		const nextBtn = document.querySelector('button[data-tour-elem="right-arrow"]');
		expect(nextBtn).toBeInTheDocument();
		await userEvent.click(nextBtn);
		expect(onImportDemoContentMock).toHaveBeenCalled();
	});
	it('should import content by default on first time use', () => {
		render(<AppGuidedTour {...DEFAULT_PROPS} />);
		expect(screen.getByLabelText('Import demo content')).toBeChecked();
	});
	it('should not import content by default when opening from menu', () => {
		localStorage.setItem(DEFAULT_LOCAL_STORAGE_KEY, 'true');
		render(<AppGuidedTour {...DEFAULT_PROPS} />);
		expect(screen.getByLabelText('Import demo content')).not.toBeChecked();
	});
	it('should reset state on close', () => {
		const onRequestCloseMock = jest.fn();
		localStorage.setItem(DEFAULT_LOCAL_STORAGE_KEY, 'true');
		render(<AppGuidedTour {...DEFAULT_PROPS} onRequestClose={onRequestCloseMock} />);
		const nextBtn = document.querySelector('button[data-tour-elem="right-arrow"]');
		userEvent.click(nextBtn);
		userEvent.click(screen.getByText('Let me try'));

		expect(onRequestCloseMock).toHaveBeenCalled();
	});
	it('Should open if local storage flag is not set', () => {
		const onRequestOpenMock = jest.fn();
		render(<AppGuidedTour {...DEFAULT_PROPS} isOpen={false} onRequestOpen={onRequestOpenMock} />);
		expect(onRequestOpenMock).toHaveBeenCalled();
	});
	it('Should not open if local storage flag is set', () => {
		localStorage.setItem(DEFAULT_LOCAL_STORAGE_KEY, 'true');
		const onRequestOpenMock = jest.fn();
		render(<AppGuidedTour {...DEFAULT_PROPS} isOpen={false} onRequestOpen={onRequestOpenMock} />);
		expect(onRequestOpenMock).not.toHaveBeenCalled();
	});
	it('Should set a local storage flag when closed', () => {
		const onCloseMock = jest.fn();
		render(<AppGuidedTour {...DEFAULT_PROPS} onClose={onCloseMock} />);
		const nextBtn = document.querySelector('button[data-tour-elem="right-arrow"]');
		userEvent.click(nextBtn);
		userEvent.click(screen.getByText('Let me try'));
		expect(localStorage.getItem(DEFAULT_LOCAL_STORAGE_KEY)).toBe('true');
	});
	it('Should not show demo content form if no step is provided', async () => {
		const onRequestOpenMock = jest.fn();
		render(
			<AppGuidedTour
				{...DEFAULT_PROPS}
				isOpen={false}
				onRequestOpen={onRequestOpenMock}
				demoContentSteps={null}
			/>,
		);
		expect(screen.queryByText('Import demo content')).not.toBeInTheDocument();
	});
});
