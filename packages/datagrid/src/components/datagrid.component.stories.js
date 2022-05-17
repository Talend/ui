/* eslint-disable no-console, react/prop-types */

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';

import DataGrid, { EditableCellRenderer, EditablePlaygroundCellRenderer } from '.';
import DynamicDataGrid from '../../stories/DynamicDataGrid.component';
import FasterDatagridComponent from '../../stories/FasterDatagrid.component';
import sample from '../../stories/sample.json';
import sample2 from '../../stories/sample2.json';
import sample3 from '../../stories/sample3.json';
import sampleWithoutQuality from '../../stories/sampleWithoutQuality.json';
import { getColumnDefs } from './DatasetSerializer/datasetSerializer';

// eslint-disable-next-line no-irregular-whitespace
sample.data[0].value.field0.value = `﻿﻿﻿﻿﻿﻿﻿  loreum lo
psum	 	 `;

sample.data[1].value.field0.value = `loreum lo
very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong value`;

sample.data[2].value.field0.value =
	'very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong value';

sample.data[3].value.field0.value = 'multiple       spaces';

export default {
	title: 'Datagrid/Component',
	decorators: [
		story => <div style={{ height: '90vh', backgroundColor: 'lightGrey' }}>{story()}</div>,
	],
};

const defaultGridProps = {
	data: sample,
	onFocusedCell: action('onFocusedCell'),
	onFocusedColumn: action('onFocusedColumn'),
	onVerticalScroll: event => console.log(event),
	rowSelection: 'multiple',
};

export const Default = () => <DataGrid {...defaultGridProps} enableColResize={false} />;

Default.parameters = {
	chromatic: { disableSnapshot: false },
};

export const CustomRenderer = () => (
	<DataGrid
		data={sample}
		cellRenderer={props => <div>{`${props.value.value}`}&#128570;</div>}
		headerRenderer={props => <div>{props.displayName} &#128126;</div>}
		pinHeaderRenderer={() => <div>&#129302;</div>}
	/>
);

export const WithSelection = () => (
	<DataGrid
		data={sample}
		onFocusedCell={action('onFocusedCell')}
		onFocusedColumn={action('onFocusedColumn')}
		focusedColumnId="data.field2"
	/>
);
WithSelection.parameters = {
	chromatic: { disableSnapshot: false },
};

export const OnlyColumnName = () => (
	<DataGrid
		{...defaultGridProps}
		data={sampleWithoutQuality}
		headerHeight={45}
		columnsConf={{ hideSubType: true }}
		enableColResize={false}
	/>
);

export const NoQuality = () => (
	<DataGrid
		{...defaultGridProps}
		data={sampleWithoutQuality}
		headerHeight={55}
		enableColResize={false}
	/>
);

export const ColumnsResizables = () => <DataGrid {...defaultGridProps} />; // Same as default 🤔

export const StartIndexTo1 = () => <DataGrid {...defaultGridProps} startIndex={1} />;

export const NoRowSpecificMessage = () => (
	<DataGrid {...defaultGridProps} data={[]} overlayNoRowsTemplate="Custom message" />
);

export const LoadingDatagrid = () => <DataGrid data={sample} loading />;

export const LoadingCells = () => <DataGrid data={sample3} />;

export const DynamicChangeSchema = () => {
	class WithLayout extends React.Component {
		constructor() {
			super();
			this.changeState = this.changeState.bind(this);
			this.state = { firstSample: true };
		}

		changeState() {
			this.setState(prevState => ({
				firstSample: !prevState.firstSample,
			}));
		}

		render() {
			const currentSample = this.state.firstSample ? sample : sample2;
			return (
				<div>
					<input type="button" value="changestatus" onClick={this.changeState} />
					Number of fields : {currentSample.schema.fields.length}
					<div style={{ height: '200px' }}>
						<DataGrid {...defaultGridProps} data={currentSample} />
					</div>
				</div>
			);
		}
	}
	return <WithLayout />;
};

export const DynamicChangeData = () => <DynamicDataGrid />;

export const FasterDatagrid = () => <FasterDatagridComponent />;

export const ControlledFocusedColumn = () => {
	const [focusedColumnId, setFocusedColumnId] = useState('data.field2');
	const [locked, setLocked] = useState(false);
	return (
		<div style={{ height: 200, width: 800 }}>
			<input
				type="button"
				value="Select 3rd column"
				onClick={() => setFocusedColumnId('data.field2')}
			/>
			<input
				type="button"
				value="Select last column"
				onClick={() => setFocusedColumnId('data.field9')}
			/>
			<input type="button" value="Unselect" onClick={() => setFocusedColumnId(null)} />
			<input type="button" value={locked ? 'Unlock' : 'Lock'} onClick={() => setLocked(!locked)} />
			<DataGrid
				{...defaultGridProps}
				focusedColumnId={focusedColumnId}
				onFocusedCell={cell => {
					if (!locked) {
						setFocusedColumnId(cell.column.colId);
					}

					action('onFocusedCell')(cell);
				}}
				onFocusedColumn={col => {
					if (!locked) {
						setFocusedColumnId(col.colId);
					}
					action('onFocusedColumn')(col);
				}}
			/>
		</div>
	);
};

export const EditableCell = () => {
	const cellEditor = (props, ref) => {
		return <EditableCellRenderer {...props} ref={ref} />;
	};

	return (
		<DataGrid
			{...defaultGridProps}
			editable
			frameworkComponents={{ cellEditor: React.forwardRef(cellEditor) }}
			getColumnDefsFn={(...args) => {
				return getColumnDefs(...args).map(column => ({
					...column,
					editable: true,
					cellEditor: 'cellEditor',
				}));
			}}
		/>
	);
};

export const EditablePlaygroundCell = () => {
	const delay = () => new Promise(resolve => setTimeout(resolve, 500));
	const searchSamplePostalCode = search => {
		return sample.data
			.reduce((codes, row) => {
				const postalCode = row.value.field2.value;
				return postalCode?.includes('search') && !codes.includes(postalCode)
					? codes
					: [...codes, postalCode];
			}, [])
			.sort((a, b) => {
				if (a?.startsWith(search) ^ b?.startsWith(search)) {
					if (a?.startsWith(search)) {
						return -1;
					}
					if (b?.startsWith(search)) {
						return -1;
					}
				}

				return a?.localeCompare(b);
			});
	};

	const cellEditor = (props, ref) => {
		return (
			<EditablePlaygroundCellRenderer
				{...props}
				ref={ref}
				getSemanticType={async semanticType => {
					await delay();
					const type = semanticType === 'Code postal' ? 'DICT' : 'NOT DICT';
					return { type };
				}}
				getSemanticTypeSuggestions={async (_, search) => {
					await delay();
					return searchSamplePostalCode(search);
				}}
				onSubmit={action('onSubmit')}
			/>
		);
	};

	return (
		<DataGrid
			{...defaultGridProps}
			editable
			frameworkComponents={{ cellEditor: React.forwardRef(cellEditor) }}
			getColumnDefsFn={(...args) =>
				getColumnDefs(...args).map(column => ({
					...column,
					domain: column.headerName,
					editable: true,
					cellEditor: 'cellEditor',
					cellEditorPopup: true,
				}))
			}
		/>
	);
};
