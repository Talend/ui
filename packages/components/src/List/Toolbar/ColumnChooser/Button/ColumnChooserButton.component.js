import React from 'react';
import ColumnChooserModal from '../Modal/ColumnChooserModal.component';
import ActionButton from '../../../../Actions/ActionButton';

export default class ColumnChosser extends React.Component {
	render() {
		return (
			<ActionButton
				id="button-column-chooser"
				label=""
				icon="talend-burger"
				data-feature="action"
				overlayComponent={<ColumnChooserModal columns={this.props.columns} />}
			/>
		);
	}
}
