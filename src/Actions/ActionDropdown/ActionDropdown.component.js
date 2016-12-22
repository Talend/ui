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

	const dropdown = (
		<DropdownButton
			title={title}
			bsStyle={style}
			role="button"
			{...rest}
		>
			{
				items.length ?
					items.map((item, index) => (
						<MenuItem {...item} key={index}>
							{item.label}
						</MenuItem>
					)) : (<MenuItem disabled>No options</MenuItem>)
			}
		</DropdownButton>
	);

	return hideLabel ?
		(
			<TooltipTrigger
				label={label}
				tooltipPlacement={tooltipPlacement}
			>
				{dropdown}
			</TooltipTrigger>
		) :
		dropdown;
}

ActionDropdown.propTypes = {
	bsStyle: PropTypes.string,
	hideLabel: PropTypes.bool,
	icon: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		...MenuItem.propTypes,
	})).isRequired,
	label: PropTypes.string.isRequired,
	link: PropTypes.bool,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
};

ActionDropdown.defaultProps = {
	bsStyle: 'default',
	tooltipPlacement: 'top',
};

export default ActionDropdown;
