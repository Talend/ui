import React from 'react';
import ColumnChooserModal from '../Modal/ColumnChooserModal.component';
import ActionButton from '../../../../Actions/ActionButton';

export default class ColumnChosser extends React.Component {
	state = {
		opened: false,
	};

	/*
	onClick = event => {
		if (this.props.onClick) {
			this.props.onClick(event, this.getState());
		}
		this.setState(prevState => {
			return {
				opened: !prevState.opened,
			};
		});
	};
	*/
	getState() {
		return {
			opened: this.state.opened || this.props.opened,
		};
	}

	render() {
		const props = this.getState();
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
