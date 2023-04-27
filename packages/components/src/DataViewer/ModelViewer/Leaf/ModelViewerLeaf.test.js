import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Component from './ModelViewerLeaf.component';
import { defaultGetDisplayValue, defaultGetDisplayKey } from '../ModelViewer.container';

const type = { dqType: 'typeSem' };

describe('ModelViewerLeaf', () => {
	it('should render ModelViewerLeaf', () => {
		const value = {
			name: 'toto',
			type,
		};
		const { container } = render(
			<Component
				dataKey="myDataKey"
				getDisplayValue={defaultGetDisplayValue}
				jsonpath="$"
				value={value}
			/>,
		);
		expect(screen.getByText('toto')).toBeVisible();
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByRole('button')).not.toHaveClass('tc-model-leaf-button-highlighted');
		expect(screen.getByRole('button')).toHaveClass('tc-model-leaf-button');
	});

	it('should render ModelViewerLeaf highlighted', () => {
		const value = {
			type,
		};
		render(
			<Component
				datasetId="42"
				dataKey="myDataKey"
				getDisplayKey={defaultGetDisplayKey}
				getDisplayValue={defaultGetDisplayValue}
				hasSemanticAwareness
				jsonpath="$"
				jsonPathSelection="$"
				value={value}
			/>,
		);
		expect(screen.getByRole('button')).toHaveClass('tc-model-leaf-button-highlighted');
		expect(screen.getByRole('button')).toHaveClass('tc-model-leaf-button');
	});

	it('should render ModelViewerLeaf with additional data', () => {
		const value = {
			type,
		};
		function renderLeafOptions(v) {
			return <div data-testid="leaf">Render some data, can use value {v.type.dqType}</div>;
		}
		const props = {
			datasetId: '42',
			dataKey: 'myDataKey',
			getDisplayKey: defaultGetDisplayKey,
			getDisplayValue: defaultGetDisplayValue,
			hasSemanticAwareness: true,
			jsonpath: '$',
			jsonPathSelection: '$',
			value: value,
			renderLeafOptions,
		};
		render(<Component {...props} />);
		expect(screen.getByTestId('leaf')).toBeVisible();
	});

	it('should call onSelect when click on the leaf', async () => {
		const value = {
			name: 'toto',
			type: [{ dqType: 'firstType' }, { dqType: 'secondType' }],
		};
		const jsonpath = '$';
		const onSelect = jest.fn();
		render(
			<Component
				datasetId="42"
				dataKey="myDataKey"
				getDisplayKey={defaultGetDisplayKey}
				getDisplayValue={defaultGetDisplayValue}
				jsonpath="$"
				onSelect={onSelect}
				value={value}
			/>,
		);
		await userEvent.click(screen.getByRole('button'));
		expect(onSelect).toHaveBeenCalledWith(expect.anything({ type: 'click' }), jsonpath, value);
	});
});
