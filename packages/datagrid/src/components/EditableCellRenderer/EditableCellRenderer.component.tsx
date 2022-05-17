import React, { useState, useImperativeHandle, Ref } from 'react';

import RichCellEditor from './RichCellEditor.component';

interface AgEditorCellRendererPropTypes {
	value: string;
	colDef: {
		domain: string; // @todo ?
	};
	// props.colDef.domain;
	data: any; // @todo
	stopEditing: (variable?: boolean) => void;
}

function EditableCellRenderer(props: AgEditorCellRendererPropTypes, ref: Ref<HTMLElement>) {
	const { value, colDef, data, stopEditing } = props;
	const [state, setState] = useState(value.value);
	useImperativeHandle(ref, () => ({
		isPopup: () => true,
		getValue: () => state,
	}));

	const semanticType = props.colDef.domain;
	

	return (
		<RichCellEditor
			initialValue={value.value}
			onChange={setState}
			// onInit={semanticType ? () => getSemanticType(semanticType) : null}
			// onFilter={semanticType ? search => getSemanticTypeSuggestions(semanticType, search) : null}
			// onSubmit={(newValue, updateAllCellsWithValue) => {
			// 	stopEditing();
			// 	editCell(data, colDef, newValue, updateAllCellsWithValue);
			// }}
			onCancel={() => props.stopEditing(true)}
		/>
	);
}

export default React.forwardRef(EditableCellRenderer);
