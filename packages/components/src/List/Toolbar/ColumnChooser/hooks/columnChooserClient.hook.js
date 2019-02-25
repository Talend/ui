import { useState, useEffect } from 'react';
import { mergedColumnsChooser } from '../service';

function useColumnChooserClient(columns = [], submitCustomColumnChooser = () => {}) {
	const [state, setState] = useState({ columns });
	function submitColumnChooser(event, { editedColumns }) {
		setState({ columns: editedColumns });
	}

	useEffect(() => {
		submitCustomColumnChooser({}, state.columns);
	}, [state.columns]);

	return {
		state: Object.freeze({ columns: mergedColumnsChooser(columns, state.columns) }),
		submitColumnChooser,
	};
}
// eslint-disable-next-line import/prefer-default-export
export { useColumnChooserClient };
