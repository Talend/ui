import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import RichLayout from '../../../../RichTooltip/RichLayout';
import theme from './ColumnChooser.scss';
import { useColumnChooserManager } from '../hooks';
import { DefaultHeader, DefaultBody, DefaultFooter } from './DefaultColumnChooser.components';

export default function ColumnChooserContent({
	body,
	columns,
	footer,
	header,
	id,
	lockedLeftItems,
	onClose,
	submitColumnChooser,
	t,
}) {
	const {
		onChangeVisibility,
		onBlurInputTextOrder,
		onKeyPressInputTextOrder,
		onSelectAll,
		stateColumnChooser,
		onSubmitColumnChooser,
	} = useColumnChooserManager(columns, submitColumnChooser, lockedLeftItems);

	useEffect(() => {
		// eslint-disable-next-line no-console
		console.warn(
			'Guideline and developpement of the ColumnChooser component still in progress. It may have breaking change in the future',
		);
	}, [id]);

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
							onClose={onClose}
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
	header: PropTypes.object,
	id: PropTypes.string.isRequired,
	lockedLeftItems: PropTypes.number,
	onClose: PropTypes.func,
	submitColumnChooser: PropTypes.func.isRequired,
	t: PropTypes.func,
};
