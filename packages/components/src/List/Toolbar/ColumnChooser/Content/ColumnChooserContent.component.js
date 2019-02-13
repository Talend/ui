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
		handlerChangeVisibility,
		handlerBlurInputTextOrder,
		handlerDragAndDrop,
		handlerInputTextOrder,
		handlerSelectAll,
		stateColumnChooser,
		submitColumnChooser,
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
							onChangeVisibility={handlerChangeVisibility}
							onDragAndDrop={handlerDragAndDrop}
							onBlurOrder={handlerBlurInputTextOrder}
							onKeyPressOrder={handlerInputTextOrder}
						/>
					)
				}
				Footer={
					footer || (
						<DefaultFooter
							onSelectAll={handlerSelectAll}
							selectAllValue={stateColumnChooser.selectAll}
							submit={submitColumnChooser}
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
