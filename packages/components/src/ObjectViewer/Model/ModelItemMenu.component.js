import React from 'react';
import PropTypes from 'prop-types';
import { Action } from '../../Actions';

export default class ModelItemMenu extends React.Component {
	// DEPRECATED REACT 16.3
	componentWillUnmount() {
		this.props.onClose();
	}

	render() {
		const { menuItems, onMenuItemClick, ...props } = this.props;
		const menuStyle = {
			listStyle: 'none',
			padding: 0,
			margin: 0,
		};

		return (
			<ul style={menuStyle}>
				{menuItems.map((item, index) => {
					const onClick =
						item.onClick &&
						function onClick(event) {
							if (onMenuItemClick) {
								onMenuItemClick(event);
							}
							item.onClick(event, props);
						};
					return (
						<li key={index}>
							<Action link autoFocus={index === 0} {...item} onClick={onClick} />
						</li>
					);
				})}
			</ul>
		);
	}
}
ModelItemMenu.defaultProps = {
	menuItems: [],
};
ModelItemMenu.propTypes = {
	menuItems: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
	onMenuItemClick: PropTypes.func,
};
