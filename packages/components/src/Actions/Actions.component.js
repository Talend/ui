import PropTypes from 'prop-types';
import React from 'react';
import { ButtonGroup, OverlayTrigger } from '@talend/react-bootstrap';
import classNames from 'classnames';
import Action from './Action';
import Inject from '../Inject';

function getButtonGroupProps(props) {
	const buttonGroupProps = {};
	Object.keys(ButtonGroup.propTypes).forEach(id => {
		if (props[id] !== undefined) {
			buttonGroupProps[id] = props[id];
		}
	});
	return buttonGroupProps;
}

/**
 * @param {object} props react props
 * @example
const actions: [
    {
		label: 'edit',
		icon: 'fa fa-edit',
		onClick: action('onEdit'),
	},
    {
		label: 'delete',
		icon: 'fa fa-trash-o',
		onClick: action('onDelete'),
	},
    {
		displayMode: 'dropdown',
		label: 'related items',
		icon: 'fa fa-file-excel-o',
		items: [
			{
				label: 'document 1',
				onClick: action('document 1 click'),
			},
			{
				label: 'document 2',
				onClick: action('document 2 click'),
			},
		],
	},
	{
		id: 'split-dropdown-id',
		displayMode: 'splitDropdown',
		label: 'add file',
		onClick: action('onClick'),
		items: [
			{
				label: 'file 1',
				onClick: action('file 1 click'),
			},
			{
				label: 'file 2',
				onClick: action('file 2 click'),
			},
		],
	},
 ];
 <Actions actions={actions} tooltipPlacement="right" hideLabel link />
 */
function Actions({ getComponent, hideLabel, link, tooltipPlacement, ...props }) {
	const buttonGroupProps = getButtonGroupProps(props);
	const Renderers = Inject.getAll(getComponent, { Action });
	return (
		<ButtonGroup className={classNames('tc-actions', props.className)} {...buttonGroupProps}>
			{props.actions.map((action, index) => {
				const extraParams = {};
				if (hideLabel) {
					extraParams.hideLabel = hideLabel;
				}
				if (link) {
					extraParams.link = link;
				}
				if (tooltipPlacement) {
					extraParams.tooltipPlacement = tooltipPlacement;
				}

				return <Renderers.Action key={index} {...action} {...extraParams} />;
			})}
		</ButtonGroup>
	);
}

Actions.displayName = 'Actions';

Actions.propTypes = {
	actions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape(Action.propTypes)])),
	className: PropTypes.string,
	hideLabel: PropTypes.bool,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
	link: PropTypes.bool,
	...ButtonGroup.propTypes,
};

Actions.defaultProps = {
	actions: [],
};

export default Actions;
