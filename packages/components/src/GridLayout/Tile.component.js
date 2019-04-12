import React from 'react';
import PropTypes from 'prop-types';
import ActionIconToggle from '../Actions/ActionIconToggle';
import theme from './Tile.scss';
import Action from '../Actions/Action';

function renderHeader(header) {
	if (header) {
		return (
			<div className={theme['tile-header']}>
				<span className={theme["tile-label"]}>{header.label}</span>
				<span className={theme["tile-right"]}>
					{
						header.rightActions && header.rightActions.map(action => (
							<ActionIconToggle {...action} />
						))
					}
				</span>
			</div>
		);
	}
	return null;
}

function TileComponent({ content, contentProps, header }) {
	return (
		<React.Fragment>
			{ renderHeader(header) }
			<div className={theme['tile-content']}>
				<content.component {...contentProps} />
			</div>
		</React.Fragment>
	);
}

TileComponent.propTypes = {
	content: PropTypes.shape({
		component: PropTypes.element,
	}).required,
	contentProps: PropTypes.object,
	header: PropTypes.shape({
		label: PropTypes.string,
		rightActions: PropTypes.arrayOf(
			PropTypes.shape(Action.propTypes)
		),
	}),
};

export default TileComponent;

