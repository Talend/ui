import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Action } from '../../Actions';
import theme from './ModelViewer.scss';

export default class ModelItemMenu extends React.Component {
	componentWillUnmount() {
		this.props.onClose();
		this.getMenuItems = this.getMenuItems.bind(this);
	}

	getMenuItems() {
		return this.props.menuItems.map((item, index) => {
			const onClick = function onClickItem(event) {
				if (this.props.onClickItemMenu) {
					this.props.onClickItemMenu(event, this.props);
				}
				if (item.onClick) {
					item.onClick(event, this.props);
				}
			};
			return (
				<li key={index}>
					<Action link autoFocus={index === 0} {...item} onClick={onClick} />
				</li>
			);
		});
	}

	render() {
		return (
			<ul className={classNames(theme['tc-model-menu-list'], 'tc-model-menu-list')}>
				{this.props.menuItems.length && this.getMenuItems()}
			</ul>
		);
	}
}
ModelItemMenu.defaultProps = {
	menuItems: [],
};
ModelItemMenu.propTypes = {
	menuItems: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
	onClickItemMenu: PropTypes.func,
	onClose: PropTypes.func,

};
