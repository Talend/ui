import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Component, { isLoaded } from './RecordsViewerBranch.component';
jest.unmock('@talend/design-system');

describe('isLoading', () => {
	it('should return false on the initial state', () => {
		expect(isLoaded({ loading: false, loaded: false })).toEqual(false);
	});

	it('should return false when the component is loading', () => {
		expect(isLoaded({ loading: true, loaded: false })).toEqual(false);
	});

	it('should return true when the components is loaded', () => {
		expect(isLoaded({ value: {} })).toEqual(true);
	});

	it('should return true when the components is loaded', () => {
		expect(isLoaded({ loading: false, loaded: true, value: {} })).toEqual(true);
	});
});

const schema = {
	name: 'id',
	doc: 'Id',
	type: {
		type: 'integer',
	},
	'@talend-quality@': {
		0: 33,
		1: 655,
		'-1': 346,
		total: 1034,
	},
};

describe('RecordsViewerBranch', () => {
	const dataKey = 'myDataKey';
	it('should render the branch with children', async () => {
		const user = userEvent.setup();

		const onToggle = jest.fn();

		const props = {
			dataKey,
			getChilds: jest.fn(() => [{ dataKey: 'childDataKey' }, { value: { schema } }]),
			getChildsCount: jest.fn(),
			getObjectBranchDatakey: jest.fn(() => dataKey),
			getIcon: jest.fn(),
			getQuality: jest.fn(),
			index: 0,
			jsonpath: '$',
			level: 0,
			onToggle,
			opened: true,
			recursive: jest.fn(),
			sample: { schema },
			value: { schema },
		};
		const { container } = render(<Component {...props} />);
		expect(container.firstChild).toMatchSnapshot();
		await user.click(screen.getByTestId('records-branch'));
		await user.keyboard('{Enter}');
		await user.keyboard('{Space}');

		expect(onToggle).toHaveBeenCalledWith(
			expect.anything(),
			{
				jsonpath: '$',
				opened: true,
				value: {
					schema,
				},
			},
			0,
		);
		expect(onToggle).toHaveBeenCalledTimes(3);
	});
	it('should render the branch with length badge', () => {
		const props = {
			dataKey,
			getChildsCount: jest.fn(() => 2),
			getObjectBranchDatakey: jest.fn(() => dataKey),
			getIcon: jest.fn(),
			getQuality: jest.fn(),
			index: 0,
			jsonpath: '$',
			level: 1,
			onToggle: jest.fn(),
			value: { schema },
		};
		render(<Component {...props} />);
		expect(screen.getByText('2')).toBeVisible();
	});
	it('should render the branch with additional value', () => {
		const props = {
			dataKey,
			getChildsCount: jest.fn(),
			getObjectBranchDatakey: jest.fn(() => dataKey),
			getIcon: jest.fn(),
			getQuality: jest.fn(),
			index: 0,
			jsonpath: '$',
			level: 0,
			onToggle: jest.fn(),
			opened: false,
			value: { schema },
			renderBranchAdditionalValue: () => (
				<div>Additional render for what you want, you can use the value</div>
			),
		};
		render(<Component {...props} />);
		expect(
			screen.getByText('Additional render for what you want, you can use the value'),
		).toBeVisible();
	});
});
