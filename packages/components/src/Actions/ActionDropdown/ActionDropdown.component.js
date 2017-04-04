import React, { PropTypes } from 'react';
import {
	DropdownButton,
	MenuItem,
	OverlayTrigger,
} from 'react-bootstrap';

import TooltipTrigger from '../../TooltipTrigger';
import Icon from '../../Icon';

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
			{...rest}
		>
			{
				items.length ?
					items.map((item, index) => (
						<MenuItem {...item} key={index} eventKey={item}>
							{item.icon && (<Icon name={item.icon} />)}
							{item.label}
						</MenuItem>
					)) : (<MenuItem disabled>No options</MenuItem>)
			}
		</DropdownButton>
	);

	if (hideLabel) {
		return (<TooltipTrigger
			label={label}
			tooltipPlacement={tooltipPlacement}
		>
			{dropdown}
		</TooltipTrigger>);
	}
	return dropdown;
}

ActionDropdown.propTypes = {
	bsStyle: PropTypes.string,
	hideLabel: PropTypes.bool,
	icon: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.shape({
		icon: PropTypes.string,
		label: PropTypes.string,
		...MenuItem.propTypes,
	})).isRequired,
	label: PropTypes.string.isRequired,
	link: PropTypes.bool,
	onSelect: PropTypes.func,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
};

ActionDropdown.defaultProps = {
	bsStyle: 'default',
	tooltipPlacement: 'top',
};

export default ActionDropdown;
