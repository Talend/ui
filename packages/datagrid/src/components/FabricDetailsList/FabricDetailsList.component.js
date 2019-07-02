import React, { useState } from 'react';

// import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import {
	DetailsList,
	SelectionMode,
	Sticky,
	ScrollbarVisibility,
	ScrollablePane,
	StickyPositionType,
} from 'office-ui-fabric-react';

import get from 'lodash/get';

import { getColumnDefs, getRowData } from '../DatasetSerializer/datasetSerializer';
import DefaultCellRenderer from '../DefaultCellRenderer';
import './FabricDetailsList.scss';

export function getAvroRenderer(avroRenderer) {
	return {
		intCellRenderer: 'DefaultIntCellRenderer',
		stringCellRenderer: 'DefaultStringCellRenderer',
		dateCellRenderer: 'DefaultDateCellRenderer',
		...avroRenderer,
	};
}

export default function FabricDatagrid(props) {
	const pinnedIndex = {
		field: 'index.index',
		key: 'index.index',
		name: 'index.index',
		headerName: 'index.index',
		fieldName: 'index.index',
		type: 'index.index',
		isPadded: true,
		isRowHeader: false,
		onRender: (item, index) => <span>{index}</span>,
	};
	const dataColumns = getColumnDefs(props.sample).map(columnDef => ({
		...columnDef,
		onRender: item => (
			<DefaultCellRenderer
				avroRenderer={getAvroRenderer(props.avroRenderer)}
				colDef={columnDef}
				data={item}
				value={get(item, [`${columnDef.field}`])}
				getComponent={props.getComponent}
			/>
		),
	}));
	const rowsData = getRowData(props.sample);

	const [columns, reorderColumns] = useState([pinnedIndex, ...dataColumns]);
	return (
		<ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
			<DetailsList
				items={rowsData}
				columns={columns}
				columnReorderOptions={{
					frozenColumnCountFromStart: 0,
					frozenColumnCountFromEnd: 0,
					handleColumnReorder: (draggedIndex, targetIndex) => {
						const draggedItems = columns[draggedIndex];
						const newColumns = [...columns];

						// insert before the dropped item
						newColumns.splice(draggedIndex, 1);
						newColumns.splice(targetIndex, 0, draggedItems);
						reorderColumns(newColumns);
					},
				}}
				selectionMode={SelectionMode.none}
				setKey="set"
				onRenderDetailsHeader={(headerProps, defaultRender) => (
					<Sticky
						stickyPosition={StickyPositionType.Header}
						isScrollSynced
						stickyBackgroundColor="transparent"
					>
						<div>{defaultRender(headerProps)}</div>
					</Sticky>
				)}
			/>
		</ScrollablePane>
	);
}
