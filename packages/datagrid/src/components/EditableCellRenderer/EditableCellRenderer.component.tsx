import React, { useState, useImperativeHandle, Ref } from 'react';
import { AgCellEditorRendererPropTypes } from '../../types';

import RichCellEditor from '../RichCellEditor';

function EditableCellRenderer(props: AgCellEditorRendererPropTypes, ref: Ref<HTMLElement>) {
	const { value, colDef, data, stopEditing } = props;
	const [state, setState] = useState(value.value);
	useImperativeHandle(ref, (): any => ({ getValue: () => state }));

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
