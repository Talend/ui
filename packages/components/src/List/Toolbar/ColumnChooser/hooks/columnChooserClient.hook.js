import { useState, useEffect } from 'react';
import { mergedColumnsChooser } from '../service';

function useColumnChooserClient(columns = [], handlerCustomColumnChooser = () => {}) {
	const [state, setState] = useState({ columns });
	function handlerColumnChooser(event, { editedColumns }) {
		setState({ columns: editedColumns });
	}

	useEffect(() => {
		handlerCustomColumnChooser({}, state.columns);
	}, [state.columns]);

	return {
		state: Object.freeze({ columns: mergedColumnsChooser(columns, state.columns) }),
		handlerColumnChooser,
	};
}

export { useColumnChooserClient };
