import { useState, useEffect } from 'react';
import { mergedColumnsChooser } from '../service';

function useColumnChooserClient(handlerCustomColumnChooser, columns) {
	const [state, setState] = useState({ columns: columns || [] });

	function handlerColumnChooser(event, { editedColumns }) {
		setState({ columns: editedColumns });
	}

	function getColumns() {
		if (columns) {
			return mergedColumnsChooser(columns, state.columns);
		}
		return state.columns;
	}

	useEffect(() => {
		handlerCustomColumnChooser();
	}, [state.columns]);

	return { state: { ...state, columns: getColumns() }, handlerColumnChooser };
}

export { useColumnChooserClient };
