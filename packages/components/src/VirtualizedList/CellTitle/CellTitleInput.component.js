import React, { PropTypes } from 'react';
import keycode from 'keycode';

/**
 * Title input mode.
 * - It initializes the input value
 * - It adds handlers on form submit, ESC (cancel) and blur (submit) events
 */
export default class CellTitleInput extends React.Component {
	constructor(props) {
		super(props);
		this.onBlur = this.onBlur.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		this.titleInput.value = this.props.cellData;
	}

	onKeyUp(event) {
		if (event.keyCode === keycode('escape')) {
			this.props.onEditCancel(event, this.props.rowData);
		}
	}

	onBlur(event) {
		this.onSubmit(event);
	}

	onSubmit(event) {
		this.props.onEditSubmit(event, {
			value: event.target.value,
			model: this.props.rowData,
		});
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<input
					id={this.props.id}
					ref={(input) => { this.titleInput = input; }}
					onBlur={this.onBlur}
					onKeyUp={this.onKeyUp}
					autoFocus
				/>
			</form>
		);
	}
}

CellTitleInput.propTypes = {
	id: PropTypes.string,
	cellData: PropTypes.string.isRequired,
	onEditCancel: PropTypes.func.isRequired,
	onEditSubmit: PropTypes.func.isRequired,
	rowData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
