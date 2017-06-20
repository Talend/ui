import React, { PropTypes } from 'react';
import { Actions } from 'react-talend-components';

function noop() {}

class FormActions extends React.Component {
	onClickHandler(actionOnClick) {
		if (!actionOnClick) {
			return noop;
		}
		return function onClick(event) {
			return actionOnClick(event, ...this.getForm());
		};
	}

	render() {
		if (!this.props.actions) {
			return (<button type="submit" className="btn btn-primary">Submit</button>);
		}
		const adaptedActions = this.props.actions.map(action => ({
			...action,
			onClick: this.onClickHandler(action.onClick),
		}));
		return (
			<Actions
				actions={adaptedActions}
				className={this.props.className}
			/>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	FormActions.propTypes = {
		actions: Actions.propTypes.actions,
		className: PropTypes.string,
		getForm: PropTypes.func,
	};
}

export default FormActions;
