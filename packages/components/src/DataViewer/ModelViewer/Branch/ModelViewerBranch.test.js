import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Component from './ModelViewerBranch.component';
jest.unmock('@talend/design-system');

describe('ModelViewerBranch', () => {
	it('render ModelViewerBranch', () => {
		// given
		const props = {
			dataKey: 'myDataKey',
			getDisplayKey: jest.fn(() => 'myKeyValue'),
			getDisplayValue: jest.fn(() => 'myValueValue'),
			hasSemanticAwareness: true,
			index: 0,
			isUnion: jest.fn(),
			jsonpath: '$',
			onToggle: jest.fn(),
			opened: false,
			value: {},
		};
		// when
		render(<Component {...props} />);
		// then
		expect(screen.getByText('myValueValue')).toBeVisible();
	});
	it('render ModelViewerBranch as a union', () => {
		// given
		const props = {
			dataKey: 'myDataKey',
			getChilds: jest.fn(),
			getDisplayValue: jest.fn(() => 'myValueValue'),
			hasSemanticAwareness: false,
			index: 0,
			isUnion: jest.fn(() => true),
			jsonpath: '$',
			onToggle: jest.fn(),
			opened: false,
			recursive: jest.fn(),
			value: {},
		};
		// when
		render(<Component {...props} />);
		// then
		expect(props.recursive).toHaveBeenCalled();
		// caret-down means opened
		expect(screen.getByTitle('Collapse myDataKey ($)')).toHaveAttribute(
			'name',
			'talend-caret-down',
		);
	});
});
describe('ModelViewerBranch#onClickLeafBranch', () => {
	it('shoul call onToggle with union and firstClickUnion true', async () => {
		// given
		const props = {
			dataKey: 'myDataKey',
			getChilds: jest.fn(),
			getDisplayValue: jest.fn(() => 'myValueValue'),
			hasSemanticAwareness: false,
			index: 0,
			isUnion: jest.fn(() => true),
			jsonpath: '$',
			onToggle: jest.fn(),
			opened: false,
			recursive: jest.fn(),
			value: {},
		};
		// when
		render(<Component {...props} />);
		await userEvent.click(screen.getByTestId('model-branch-button'));
		// then
		expect(props.onToggle).toHaveBeenCalledWith(
			expect.anything({ type: 'click' }),
			{ firstClickUnion: true, jsonpath: '$', opened: false, value: {} },
			0,
		);
	});
	it('shoul call onToggle', async () => {
		// given
		const props = {
			dataKey: 'myDataKey',
			getChilds: jest.fn(),
			getDisplayValue: jest.fn(() => 'myValueValue'),
			hasSemanticAwareness: false,
			index: 0,
			isUnion: jest.fn(() => false),
			jsonpath: '$',
			onToggle: jest.fn(),
			opened: false,
			recursive: jest.fn(),
			value: {},
		};

		// when
		render(<Component {...props} />);
		await userEvent.click(screen.getByTestId('model-branch-button'));
		// then
		expect(props.onToggle).toHaveBeenCalledWith(
			expect.anything({ type: 'click' }),
			{ jsonpath: '$', opened: false, value: {} },
			0,
		);
	});
});
