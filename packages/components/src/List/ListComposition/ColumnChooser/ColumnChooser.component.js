import React from 'react';

import { useListContext } from '../context';
import ColumnChooserButton from '../../Toolbar/ColumnChooserButton';

function ColumnChooser(props) {
	const { columns = [], visibleColumns, setVisibleColumns } = useListContext();

	return (
		<ColumnChooserButton
			columns={columns.map(({ dataKey, label }, i) => ({
				key: dataKey,
				label,
				hidden: !visibleColumns?.includes(dataKey),
				order: i + 1,
			}))}
			onSubmit={(_, changes) => {
				setVisibleColumns(changes.filter(c => !c.hidden).map(c => c.key));
			}}
			{...props}
		/>
	);
}

export default ColumnChooser;
