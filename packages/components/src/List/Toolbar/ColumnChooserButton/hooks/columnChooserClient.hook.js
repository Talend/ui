import { useState, useEffect } from 'react';
import { mergedColumnsChooser } from '../service';

function useColumnChooserClient(columns, submit) {
	const [state, setState] = useState({ columns });
	function submitColumnChooser(event, editedColumns) {
		setState({ columns: editedColumns });
	}

	useEffect(() => {
		submit({}, state.columns);
	}, [state.columns]);

	return {
		columnsChooser: mergedColumnsChooser(columns, state.columns),
		submitColumnChooser,
	};
}
// eslint-disable-next-line import/prefer-default-export
export { useColumnChooserClient };
