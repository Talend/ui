import React, { useEffect, useImperativeHandle, useState } from 'react';

import { AgCellEditorRendererPropTypes, AgGridCellValue } from '../../types';
import RichCellEditorComponent from '../EditableCellRenderer/RichCellEditor.component';

import ApplyToIdenticalValues from './ApplyToIdenticalValues.component';

type SemanticType = {
	type: string;
};

type EditablePlaygroundCellRendererPropTypes = AgCellEditorRendererPropTypes & {
	getSemanticType: (semanticType: string) => Promise<SemanticType>;
	getSemanticTypeSuggestions: (semanticTypeName: string, search: string) => Promise<string[]>;
	onSubmit: (value: string) => void;
};

function formatSuggestions(values: string[]): AgGridCellValue[] {
	return values && values.length ? values.map(v => ({ name: v, value: v })) : [];
}

function EditablePlaygroundCellRenderer(
	props: EditablePlaygroundCellRendererPropTypes,
	ref: React.Ref<HTMLElement>,
) {
	const { value, colDef, getSemanticType, getSemanticTypeSuggestions, onSubmit, stopEditing } =
		props;
	const [state, setState] = useState(value.value);
	const [isLoading, setIsLoading] = useState(false);
	const [showApplyAll, setShowApplyAll] = useState(false);
	const [semanticType, setSemanticType] = useState<SemanticType>();

	useImperativeHandle(ref, (): any => ({ getValue: () => state }));

	useEffect(() => {
		if (colDef.domain) {
			setIsLoading(true);
			getSemanticType(colDef.domain)
				.then(setSemanticType)
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (!colDef.cellEditorPopup) {
		throw new Error(
			'Using EditablePlaygroundCellRenderer as cell editor requires "cellEditorPopup: true" in the column definition.',
		);
	}

	const hasSuggestions = semanticType?.type === 'DICT';

	const onCancel = () => {
		stopEditing(true);
	};

	return (
		<>
			<RichCellEditorComponent
				initialValue={value.value}
				hasOptions={hasSuggestions}
				isLoading={isLoading}
				onChange={newValue => {
					setShowApplyAll(newValue !== value.value);
					setState(newValue);
				}}
				onCancel={onCancel}
				onFilter={
					hasSuggestions
						? (search: string) =>
								getSemanticTypeSuggestions(colDef.domain, search).then(formatSuggestions)
						: undefined
				}
			/>
			{showApplyAll && (
				<ApplyToIdenticalValues
					onCancel={onCancel}
					onSubmit={() => {
						stopEditing();
						onSubmit(state);
					}}
				/>
			)}
		</>
	);
}

export default React.forwardRef(EditablePlaygroundCellRenderer);
