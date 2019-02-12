import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RichLayout from '../../../../RichTooltip/RichLayout';
import getDefaultT from '../../../../translate';
import theme from './ColumnChooser.scss';
import { useColumnChooserManager } from '../hooks';
import { DefaultHeader, DefaultBody, DefaultFooter } from './DefaultColumnChooser.components';

export default function ColumnChooserContent({
	id,
	columns,
	handlerColumnChooser,
	header,
	body,
	footer,
	t,
}) {
	const {
		stateColumnChooser,
		submitColumns,
		changeColumnOrder,
		changeColumnVisibility,
		handlerInputOrder,
		onDragAndDrop,
		onBlurColumnOrder,
		selectAll,
	} = useColumnChooserManager(columns, handlerColumnChooser);
	return (
		<div
			id={`${id}-column-chooser-content`}
			className={classNames(theme['tc-column-chooser'], 'tc-column-chooser')}
		>
			<RichLayout
				Header={header || <DefaultHeader t={t} />}
				Content={
					body || (
						<DefaultBody
							columns={stateColumnChooser.editedColumns}
							changeColumnOrder={changeColumnOrder}
							changeColumnVisibility={changeColumnVisibility}
							onDragAndDrop={onDragAndDrop}
							onBlurColumnOrder={onBlurColumnOrder}
							onKeyPressOrder={handlerInputOrder}
						/>
					)
				}
				Footer={
					footer || (
						<DefaultFooter
							onSelectAll={selectAll}
							selectAllValue={stateColumnChooser.selectAll}
							submitColumns={submitColumns}
							t={t}
						/>
					)
				}
			/>
		</div>
	);
}

ColumnChooserContent.defaultProps = {
	t: getDefaultT(),
};

ColumnChooserContent.propTypes = {
	body: PropTypes.object,
	columns: PropTypes.array.isRequired,
	footer: PropTypes.object,
	handlerColumnChooser: PropTypes.func.isRequired,
	header: PropTypes.object,
	id: PropTypes.string.isRequired,
	t: PropTypes.func,
};
