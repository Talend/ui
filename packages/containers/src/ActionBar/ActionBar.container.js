import React, { PropTypes } from 'react';

import { ActionBar as Component } from 'react-talend-components';
import { getActionsProps } from '../actionAPI';

function getActions(context, idOrInfo, model) {
	if (typeof idOrInfo === 'string') {
		return getActionsProps(context, idOrInfo, model);
	} else if (idOrInfo.displayMode === 'splitDropdown') {
		return Object.assign({
			displayMode: idOrInfo.displayMode,
			items: getActionsProps(context, idOrInfo.items, model),
		}, getActionsProps(context, idOrInfo.name, model));
	} else if (idOrInfo.displayMode === 'btnGroup') {
		return {
			displayMode: idOrInfo.displayMode,
			actions: getActionsProps(context, idOrInfo.actions, model),
		};
	}
	return undefined;
}


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
				actionsProps.left = left.map(info => getActions(this.context, info, this.props.model));
			}
			if (right) {
				actionsProps.right = right.map(info => getActions(this.context, info, this.props.model));
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
