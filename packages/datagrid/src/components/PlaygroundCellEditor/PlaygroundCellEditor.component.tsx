import React, { useEffect, useImperativeHandle, useRef, useState, forwardRef } from 'react';
import FocusTrap from 'focus-trap-react';

import { AgCellEditorRendererPropTypes, AgGridCellValue } from '../../types';
import RichCellEditorComponent from '../RichCellEditor';

import ApplyToValues from './ApplyToIdenticalValues.component';

type SemanticType = {
	type: string;
};

function formatSuggestions(values: string[]): AgGridCellValue[] {
	return values && values.length ? values.map(v => ({ name: v, value: v })) : [];
}

function PlaygroundCellEditor(props: AgCellEditorRendererPropTypes, ref: React.Ref<HTMLElement>) {
	const { eGridCell, value, colDef, stopEditing } = props;
	const { domain, cellEditorPopup, cellEditorParams } = colDef;
	const { getSemanticType, getSemanticTypeSuggestions, onSubmit } = cellEditorParams || {};

	const [state, setState] = useState(value.value);
	const currentRef = useRef<HTMLDivElement>(null);
	const [isLoading, setIsLoading] = useState(false);
	const applyToRef = useRef<HTMLDivElement>(null);
	const [applyToStyles, setApplyToStyles] = useState({});

	const [semanticType, setSemanticType] = useState<SemanticType>();

	const showApplyTo = state !== value.value;

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

		// 	// Block "Tab keydown" event propagation when "Apply to ..." element is visible
		currentRef.current?.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.key === 'Enter' || (e.key === 'Tab' && showApplyTo)) {
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

	useEffect(() => {
		// Ensure "Apply to ..." is opened where it can be seen
		if (showApplyTo && applyToRef.current) {
			const { bottom, right } = applyToRef.current.getBoundingClientRect();

			const overflowsRight = right > window.innerWidth;
			const overflowsBottom = bottom > window.innerHeight;

			setApplyToStyles({
				position: 'absolute',
				...(overflowsRight && { right: 0 }),
				...(overflowsBottom && { bottom: eGridCell.offsetHeight }),
			});
		}
	}, [applyToRef, eGridCell.offsetHeight, showApplyTo]);

	const hasSuggestions = semanticType?.type === 'DICT';

	const onCancel = () => {
		stopEditing(true);
	};

	return (
		<FocusTrap paused={!showApplyTo}>
			<div ref={currentRef}>
				<RichCellEditorComponent
					eGridCell={eGridCell}
					initialValue={value.value}
					hasSuggestions={hasSuggestions}
					isLoading={isLoading}
					onChange={newValue => {
						setState(newValue);
					}}
					onCancel={onCancel}
					onFilter={
						hasSuggestions
							? (search: string) =>
									getSemanticTypeSuggestions(domain, search).then(formatSuggestions)
							: undefined
					}
				/>
				{showApplyTo && (
					<div ref={applyToRef} style={applyToStyles}>
						<ApplyToValues
							onCancel={onCancel}
							onSubmit={(applyToValues: boolean) => {
								stopEditing();
								onSubmit(state, applyToValues);
							}}
						/>
					</div>
				)}
			</div>
		</FocusTrap>
	);
}

export default forwardRef(PlaygroundCellEditor);
