import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
// import { get } from 'lodash';
import { DropdownButton, MenuItem, OverlayTrigger } from 'react-bootstrap';
import Inject from '../../Inject';
import theme from './ActionDropdown.scss';
import TooltipTrigger from '../../TooltipTrigger';
import Icon from '../../Icon';
import { wrapOnClick } from '../Action/Action.component';

function injectMenuItem(getComponent, { component, divider, withMenuItem, ...rest }, index) {
	if (divider) {
		return <MenuItem key={index} divider />;
	}
	if (withMenuItem) {
		return (
			<MenuItem key={index}>
				<Inject component={component} getComponent={getComponent} {...rest} />
			</MenuItem>
		);
	}
	return <Inject component={component} getComponent={getComponent} {...rest} />;
}

function getMenuItem(item, index) {
	if (item.divider) {
		return <MenuItem key={index} divider />;
	}
	return (
		<MenuItem key={index} eventKey={item} {...item} onClick={wrapOnClick(item)}>
			{item.icon && <Icon name={item.icon} />}
			{item.label}
		</MenuItem>
	);
}

// function chooseMenuItemRendering(getComponent, items, components) {
// 	if (
// 		getComponent &&
// 		Array.isArray(get(components, 'itemsDropdown')) &&
// 		components.itemsDropdown.length > 0
// 	) {
// 		return components.itemsDropdown.map((component, index) =>
// 			injectMenuItem(getComponent, component, index),
// 		);
// 	}
// 	if (items.length > 0) {
// 		return items.map(getMenuItem);
// 	}
// 	return <MenuItem disabled>No options</MenuItem>;
// }

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
		getComponent,
		components,
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
			{Inject.map(getComponent, components.beforeItemsDropdown)}
			{items.map(getMenuItem)}
			{components.itemsDropdown.map(component => injectMenuItem(getComponent, component))}
			{Inject.map(getComponent, components.afterItemsDropdown)}
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
	getComponent: PropTypes.func,
	components: PropTypes.shape({
		beforeItemsDropdown: PropTypes.array,
		itemsDropdown: PropTypes.array,
		afterItemsDropdown: PropTypes.array,
	}),
};

ActionDropdown.defaultProps = {
	bsStyle: 'default',
	tooltipPlacement: 'top',
	components: {
		beforeItemsDropdown: [],
		itemsDropdown: [],
		afterItemsDropdown: [],
	},
	items: [],
};

export { ActionDropdown as default, getMenuItem, injectMenuItem };
