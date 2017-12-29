import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { DropdownButton, MenuItem, OverlayTrigger } from 'react-bootstrap';

import theme from './ActionDropdown.scss';
import TooltipTrigger from '../../TooltipTrigger';
import Icon from '../../Icon';
import { wrapOnClick } from '../Action/Action.component';

function getMenuItem(item, index) {
	console.log('item', item);
	if (item.divider) {
		return <MenuItem key={index} divider />;
	}
	if (React.isValidElement(item)) {
		return <MenuItem key={index}>{item}</MenuItem>;
	}
	return (
		<MenuItem key={index} eventKey={item} {...item} onClick={wrapOnClick(item)}>
			{item.icon && <Icon name={item.icon} />}
			{item.label}
		</MenuItem>
	);
}
/**
 * @param {object} props react props
 * @example
 const props = {
	label: 'related items',
	icon: 'fa fa-file-excel-o',
	items: [
		{
			icon: 'talend-icon',
			label: 'document 1',
			onClick: action('document 1 click'),
		},
		{
			divider: true,
		},
		{
			label: 'document 2',
			onClick: action('document 2 click'),
		},
	],
	tooltipPlacement: 'right',
	hideLabel: true,
	link: true,
	onSelect: action('item selected'),
};
 <ActionDropdown {...props} />
 */
function ActionDropdown(props) {
	const {
		bsStyle,
		hideLabel,
		icon,
		items,
		label,
		link,
		onSelect,
		tooltipPlacement,
		tooltipLabel,
		...rest
	} = props;

	const title = (
		<span>
			{icon ? <Icon name={icon} /> : null}
			{hideLabel ? null : <span>{label}</span>}
		</span>
	);
	const style = link ? 'link' : bsStyle;

	function onItemSelect(object, event) {
		if (onSelect) {
			onSelect(event, object);
		}
	}

	const dropdown = (
		<DropdownButton
			title={title}
			bsStyle={style}
			role="button"
			onSelect={onItemSelect}
			className={classNames(theme['tc-dropdown-button'], 'tc-dropdown-button')}
			{...rest}
		>
			{items.length ? items.map(getMenuItem) : <MenuItem disabled>No options</MenuItem>}
		</DropdownButton>
	);

	if (hideLabel || tooltipLabel) {
		return (
			<TooltipTrigger label={tooltipLabel || label} tooltipPlacement={tooltipPlacement}>
				{dropdown}
			</TooltipTrigger>
		);
	}
	return dropdown;
}

ActionDropdown.displayName = 'ActionDropdown';

ActionDropdown.propTypes = {
	bsStyle: PropTypes.string,
	hideLabel: PropTypes.bool,
	icon: PropTypes.string,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.string,
			label: PropTypes.string,
			...MenuItem.propTypes,
		}),
	).isRequired,
	label: PropTypes.string.isRequired,
	link: PropTypes.bool,
	onSelect: PropTypes.func,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
	tooltipLabel: PropTypes.string,
};

ActionDropdown.defaultProps = {
	bsStyle: 'default',
	tooltipPlacement: 'top',
	items: [],
};

export default ActionDropdown;
