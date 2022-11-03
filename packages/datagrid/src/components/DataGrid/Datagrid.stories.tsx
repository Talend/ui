import React, { useState } from 'react';

import { action } from '@storybook/addon-actions';
import { expect } from '@storybook/jest';
import { Meta, ComponentStory } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { ColDef, ICellRendererParams, IHeaderParams } from 'ag-grid-community';
import cloneDeep from 'lodash/cloneDeep';

import sourceSample from '../../../mocks/sample.json';
import { SELECTED_CELL_CLASS_NAME } from '../../constants';
import { getColumnDefs, getRowId, parseRow } from '../../serializers/datasetSerializer';
import DataGrid, { DataGridProps } from './DataGrid';
import PinHeaderRenderer from '../PinHeaderRenderer';

// eslint-disable-next-line no-irregular-whitespace
const sample = cloneDeep(sourceSample);
sample.data[0].value.field0.value = `﻿﻿﻿﻿﻿﻿﻿  loreum lo
psum	 	 `;

sample.data[1].value.field0.value = `loreum lo
very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong value`;

sample.data[2].value.field0.value =
	'very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong value';

sample.data[3].value.field0.value = 'multiple       spaces';

for (let c = 10; c < 50; c++) {
	sample.schema.fields.push({
		name: `field${c}`,
		type: ['null', 'string'],
	});
	sample.data.forEach(row => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		row.value[`field${c}`] = {
			value: Math.random().toFixed(10),
		};
	});
}
sample.data.push(...sample.data.slice());

const sleep = (timeout = 500) => new Promise(r => setTimeout(r, timeout));

export default {
	title: 'Datagrid/Component',
	decorators: [
		story => <div style={{ height: '90vh', backgroundColor: 'lightGrey' }}>{story()}</div>,
	],
} as Meta;

const defaultGridProps = {
	sizesLocalStorageKey: 'sb-grid-sizes',
	columnSelection: 'multiple' as DataGridProps['columnSelection'],
	rowData: sample.data.map(parseRow),
	columnDefs: getColumnDefs(sample.schema),
	onCellFocused: action('onCellFocused'),
	onSelectionChanged: action('onSelectionChanged'),
	onColumnSelectionChanged: action('onColumnSelectionChanged'),
};

const Template: ComponentStory<typeof DataGrid> = args => (
	<DataGrid {...defaultGridProps} {...args} />
);

export const Default = () => <DataGrid {...defaultGridProps} />;

export const Selection = Template.bind({});
Selection.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	await userEvent.click(
		await canvas.findByText('field1', undefined, {
			timeout: 10000,
		}),
	);
	await sleep();
	await userEvent.click(await canvas.findByText('voyageurs 2016'), {
		shiftKey: true,
	});
	await sleep();
	await userEvent.click(await canvas.findByText('Segmentation'), {
		ctrlKey: true,
	});
	await expect(canvas.getByText('voyageurs 2016').closest('.ag-header-cell')).toHaveClass(
		SELECTED_CELL_CLASS_NAME,
	);
};
Selection.parameters = {
	chromatic: { disableSnapshot: true },
};

export const ControlledSelection = Template.bind({});
ControlledSelection.args = {
	selection: {
		columnIds: ['field10'],
	},
};

export const CustomRenderer = () => (
	<DataGrid
		{...defaultGridProps}
		columnDefs={[
			{
				...defaultGridProps.columnDefs[0],
				headerComponent: () => (
					<PinHeaderRenderer onClick={action('header clicked')}>Open Menu</PinHeaderRenderer>
				),
			},
			...defaultGridProps.columnDefs.slice(1).map(colDef => ({
				...colDef,
				headerComponent: (props: IHeaderParams) => <div>{props.displayName} &#128126;</div>,
				cellRenderer: (props: ICellRendererParams) => <div>{`${props.value.value}`}&#128570;</div>,
			})),
		]}
	/>
);

export const NoQuality = () => (
	<DataGrid
		{...defaultGridProps}
		columnDefs={defaultGridProps.columnDefs.map(def => ({
			...def,
			headerComponentParams: {
				...def.headerComponentParams,
				quality: null,
			},
		}))}
		headerHeight={55}
	/>
);

export const LazyLoading = () => {
	const [state, setState] = useState(defaultGridProps.rowData.slice(0, 50));

	function updateLoadedRow(i: number) {
		setState(prev => {
			const updated = [...prev];
			updated[i] = parseRow({ ...defaultGridProps.rowData[0] }, i);
			return updated;
		});
	}

	return (
		<DataGrid
			{...defaultGridProps}
			rowData={state}
			getRowId={getRowId}
			onVerticalScroll={(event, { firstDisplayedRowIndex, lastDisplayedRowIndex }) => {
				setState(prev => {
					const updated = [...prev];
					for (let i = firstDisplayedRowIndex; i < lastDisplayedRowIndex + 9; i++) {
						if (!updated[i]) {
							updated[i] = parseRow(
								{
									loaded: false,
								},
								i,
							);
							setTimeout(() => updateLoadedRow(i), 1000);
						}
					}
					return updated;
				});
			}}
		/>
	);
};

export const NoRowSpecificMessage = () => (
	<DataGrid {...defaultGridProps} rowData={[]} overlayNoRowsTemplate="Custom message" />
);

export const LoadingDataGrid = () => <DataGrid loading />;

export const LoadingCells = () => (
	<DataGrid
		{...defaultGridProps}
		rowData={[
			{
				loaded: false,
			},
		]}
	/>
);

export const EditablePlaygroundCell = () => {
	const semanticTypeFields = ['FR_COMMUNE', 'FR_POSTAL_CODE'];
	const searchSampleValues = (search: string, colDef: ColDef) => {
		return sample.data
			.reduce((values, row) => {
				const { value } = (row.value as any)[colDef.field!];
				return value?.toLowerCase().includes(search.toLowerCase()) && !values.includes(value)
					? [...values, value]
					: values;
			}, [] as string[])
			.sort((a, b) => {
				if (a?.startsWith(search) !== b?.startsWith(search)) {
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

	return (
		<DataGrid
			{...defaultGridProps}
			columnDefs={defaultGridProps.columnDefs.map(column => ({
				...column,
				editable: true,
				cellEditorParams: {
					getSemanticType: async (semanticType: string) => {
						await sleep();
						const type = semanticTypeFields.includes(semanticType) ? 'DICT' : 'NOT DICT';
						return { type };
					},
					getSemanticTypeSuggestions: async (_: any, search: string) => {
						await sleep();
						return searchSampleValues(search, column);
					},
					onSubmit: action('onSubmit'),
				},
				cellEditorPopup: true,
			}))}
		/>
	);
};
