import React, { PropTypes } from 'react';
import { Map } from 'immutable';

import { ActionBar as Component } from 'react-talend-components';
import { getActionsProps } from '../actionAPI';

class ActionBar extends React.Component {
	static displayName = 'CMFContainer(ActionBar)';
	static propTypes = {
		...Component.propTypes,
		names: PropTypes.shape({
			left: PropTypes.arrayOf(PropTypes.string),
			right: PropTypes.arrayOf(PropTypes.string),
		}),
	};
	static contextTypes = {
		store: PropTypes.object,
		registry: PropTypes.object,
		router: PropTypes.object,
	};

	render() {
		const { actions, names, props } = this.props;
		const actionsProps = actions || {};
		if (names) {
			const { left, right } = names;
			if (left) {
				actionsProps.left = getActionsProps(this.context, left, this.props.model);
			}
			if (right) {
				actionsProps.right = getActionsProps(this.context, right, this.props.model);
			}
		}

		return (
			<Component
				actions={actionsProps}
				{...props}
			/>
		);
	}
}

export default ActionBar;
