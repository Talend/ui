import { screen, render } from '@testing-library/react';
import getRowSelectionRenderer from './RowSelection.component';

function RowRenderer(props) {
	return <div {...props} />;
}

const selectedRowData = { id: 0 };
const notSelectedRowData = { id: 1 };
function isSelected(rowData) {
	return rowData === selectedRowData;
}
function isActive(rowData) {
	return rowData === selectedRowData;
}

describe('RowSelection', () => {
	it('should render', () => {
		// given
		function getRowData() {
			return selectedRowData;
		}
		const Row = getRowSelectionRenderer(RowRenderer, { isSelected, getRowData });

		// when
		const { container } = render(<Row index={1} style={{ background: 'red' }} />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should enhance classname with selection class on selected row', () => {
		// given
		function getRowData() {
			return selectedRowData;
		}
		const Row = getRowSelectionRenderer(RowRenderer, { isSelected, getRowData });

		// when
		render(
			<Row
				data-testid="Row"
				className="my-class-names"
				index={1}
				key={18}
				style={{ background: 'red' }}
			/>,
		);

		// then
		expect(screen.getByTestId('Row')).toHaveClass('selected my-class-names');
	});

	it('should enhance classname without selection class on non selected row', () => {
		// given
		function getRowData() {
			return notSelectedRowData;
		}
		const Row = getRowSelectionRenderer(RowRenderer, { isSelected, getRowData });

		// when
		render(
			<Row
				data-testid="Row"
				className="my-class-names"
				index={1}
				key={18}
				style={{ background: 'red' }}
			/>,
		);

		// then
		expect(screen.getByTestId('Row')).toHaveClass('my-class-names');
		expect(screen.getByTestId('Row')).not.toHaveClass('selected');
	});

	it('should enhance classname with active class on active row', () => {
		// given
		function getRowData() {
			return selectedRowData;
		}
		const Row = getRowSelectionRenderer(RowRenderer, { isActive, getRowData });

		// when
		render(
			<Row
				data-testid="Row"
				className="my-class-names"
				index={1}
				key={18}
				style={{ background: 'blue' }}
			/>,
		);

		// then
		expect(screen.getByTestId('Row')).toHaveClass('active my-class-names');
	});
});
