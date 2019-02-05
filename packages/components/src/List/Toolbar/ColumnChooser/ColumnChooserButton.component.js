import React from 'react';
import ColumnChooserManager from './Manager';
import ColumnChooserContent from './Content';
import ActionButton from '../../../Actions/ActionButton';

export default function ColumnChooserButton({ id, ...rest }) {
	return (
		<ColumnChooserManager id={`${id}-column-chooser`} {...rest}>
			{({
				columnChooserId,
				columns,
				handlerColumnChooser,
				onChangeOrderColumn,
				onChangeVisibilityColumn,
				onClickModify,
				reset,
			}) => (
				<ActionButton
					id={`${columnChooserId}-button`}
					label="column-chooser-button"
					icon="talend-folder"
					data-feature="action"
					overlayPlacement="bottom"
					overlayComponent={
						<ColumnChooserContent
							columns={columns}
							handlerColumnChooser={handlerColumnChooser}
							id={columnChooserId}
							onChangeOrderColumn={onChangeOrderColumn}
							onChangeVisibilityColumn={onChangeVisibilityColumn}
							onClickModify={onClickModify}
							onExitOverlay={reset}
						/>
					}
				/>
			)}
		</ColumnChooserManager>
	);
}
