import classNames from 'classnames';

import theme from './RowSelection.module.scss';

/**
 * Higher order row-renderer that wrap the provided row renderer.
 * It manages row selection classname and inject it to the row renderer props.
 */
function getRowSelectionRenderer(
	WrappedComponent,
	{ isSelected, isActive, getRowState, getRowData, as, rowProps },
) {
	function RowSelection(props) {
		const rowData = getRowData(props);
		const active = isActive && isActive(rowData);
		const selected = isSelected && isSelected(rowData);
		const { disabled = false } = (getRowState && getRowState(rowData)) || {};

		const enhancedClassNames = classNames(
			props.className,
			theme['row-selection'],
			{ [theme.active]: active },
			{ active },
			{ [theme.selected]: selected },
			{ [theme.disabled]: disabled },
			{ selected },
		);

		return <WrappedComponent {...props} {...rowProps} as={as} className={enhancedClassNames} />;
	}

	RowSelection.propTypes = WrappedComponent.propTypes;
	RowSelection.displayName = `RowSelection(${WrappedComponent.displayName})`;

	return RowSelection;
}

export default getRowSelectionRenderer;
