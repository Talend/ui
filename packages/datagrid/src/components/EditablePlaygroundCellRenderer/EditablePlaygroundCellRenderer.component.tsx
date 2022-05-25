import React, { useEffect, useImperativeHandle, useState } from 'react';

import { AgCellEditorRendererPropTypes, AgGridCellValue } from '../../types';
import RichCellEditorComponent from '../RichCellEditor';

import ApplyToIdenticalValues from './ApplyToIdenticalValues.component';

type SemanticType = {
	type: string;
};

function formatSuggestions(values: string[]): AgGridCellValue[] {
	return values && values.length ? values.map(v => ({ name: v, value: v })) : [];
}

function EditablePlaygroundCellRenderer(
	props: AgCellEditorRendererPropTypes,
	ref: React.Ref<HTMLElement>,
) {
	const currentRef = React.useRef<HTMLDivElement>();
	const { eGridCell, value, colDef, stopEditing } = props;
	const { domain, cellEditorPopup, cellEditorParams } = colDef;
	const { getSemanticType, getSemanticTypeSuggestions, onSubmit } = cellEditorParams || {};

	const [state, setState] = useState(value.value);
	const [isLoading, setIsLoading] = useState(false);
	const [showApplyToIdentical, setShowApplyToIdentical] = useState(false);
	const [semanticType, setSemanticType] = useState<SemanticType>();

	useImperativeHandle(ref, (): any => ({ getValue: () => state }));

	useEffect(() => {
		// Check for misconfiguration in the column definition
		if (!cellEditorPopup || !getSemanticType || !getSemanticTypeSuggestions || !onSubmit) {
			throw new Error(
				`Using EditablePlaygroundCellRenderer as cell editor requires the following in the column definition:
	- cellEditorParams.getSemanticType()
	- cellEditorParams.getSemanticTypeSuggestions()
	- cellEditorParams.onSubmit()
	- cellEditorPopup (set to true)`,
			);
		}

		// Block "Tab keydown" event propagation when "Apply to ..." element is visible
		// @todo Improve by adding a focus trap so that focus remains between the edition field and the "Apply to ..." element
		currentRef.current?.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.key === 'Tab' && showApplyToIdentical) {
				e.stopPropagation();
			}
		});

		if (domain) {
			setIsLoading(true);
			getSemanticType(domain)
				.then(setSemanticType)
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const hasSuggestions = semanticType?.type === 'DICT';

	const onCancel = () => {
		stopEditing(true);
	};

	return (
		<div ref={currentRef}>
			<RichCellEditorComponent
				eGridCell={eGridCell}
				initialValue={value.value}
				hasSuggestions={hasSuggestions}
				isLoading={isLoading}
				onChange={newValue => {
					setShowApplyToIdentical(newValue !== value.value);
					setState(newValue);
				}}
				onCancel={onCancel}
				onFilter={
					hasSuggestions
						? (search: string) => getSemanticTypeSuggestions(domain, search).then(formatSuggestions)
						: undefined
				}
			/>
			{showApplyToIdentical && (
				<ApplyToIdenticalValues
					onCancel={onCancel}
					onSubmit={(applyToIdenticalValues: boolean) => {
						stopEditing();
						onSubmit(state, applyToIdenticalValues);
					}}
				/>
			)}
		</div>
	);
}

export default React.forwardRef(EditablePlaygroundCellRenderer);
