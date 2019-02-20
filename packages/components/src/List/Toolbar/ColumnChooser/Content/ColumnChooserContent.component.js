import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RichLayout from '../../../../RichTooltip/RichLayout';
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
		onChangeVisibility,
		onBlurInputTextOrder,
		onDragAndDrop,
		onKeyPressInputTextOrder,
		onSelectAll,
		stateColumnChooser,
		onSubmitColumnChooser,
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
							onBlurOrder={onBlurInputTextOrder}
							onChangeVisibility={onChangeVisibility}
							onDragAndDrop={onDragAndDrop}
							onKeyPressOrder={onKeyPressInputTextOrder}
							t={t}
						/>
					)
				}
				Footer={
					footer || (
						<DefaultFooter
							onSelectAll={onSelectAll}
							selectAllValue={stateColumnChooser.selectAll}
							submit={onSubmitColumnChooser}
							t={t}
						/>
					)
				}
			/>
		</div>
	);
}

ColumnChooserContent.propTypes = {
	body: PropTypes.object,
	columns: PropTypes.array.isRequired,
	footer: PropTypes.object,
	handlerColumnChooser: PropTypes.func.isRequired,
	header: PropTypes.object,
	id: PropTypes.string.isRequired,
	t: PropTypes.func,
};
