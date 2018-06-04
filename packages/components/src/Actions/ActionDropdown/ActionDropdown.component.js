import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import classNames from 'classnames';
import { Iterable } from 'immutable';
import { DropdownButton, MenuItem, OverlayTrigger } from 'react-bootstrap';
import Inject from '../../Inject';
import theme from './ActionDropdown.scss';
import TooltipTrigger from '../../TooltipTrigger';
import Icon from '../../Icon';
import { wrapOnClick } from '../Action/Action.component';

function InjectDropdownMenuItem({
	getComponent,
	component,
	divider,
	withMenuItem,
	liProps,
	menuItemProps,
	key,
	onSelect,
	onKeyDown,
	...rest
}) {
	const Renderers = Inject.getAll(getComponent, { MenuItem });
	if (divider) {
		return <Renderers.MenuItem key={key} {...menuItemProps} divider />;
	}
	if (withMenuItem) {
		return (
			<Renderers.MenuItem key={key} {...menuItemProps} onSelect={onSelect} onKeyDown={onKeyDown}>
				<Inject component={component} getComponent={getComponent} {...rest} />
			</Renderers.MenuItem>
		);
	}
	return (
		<li role="presentation" key={key} {...liProps}>
			<Inject component={component} getComponent={getComponent} {...rest} />
		</li>
	);
}

InjectDropdownMenuItem.propTypes = {
	getComponent: PropTypes.func.isRequired,
	component: PropTypes.string,
	divider: PropTypes.bool,
	withMenuItem: PropTypes.bool,
	liProps: PropTypes.object,
	menuItemProps: PropTypes.object,
	key: PropTypes.number,
	onSelect: PropTypes.func,
	onKeyDown: PropTypes.func,
};
InjectDropdownMenuItem.displayname = 'InjectDropdownMenuItem';

function renderMutableMenuItem(item, index, getComponent) {
	const Renderers = Inject.getAll(getComponent, { MenuItem });
	if (item.divider) {
		return <Renderers.MenuItem key={index} divider />;
	}
	return (
		<Renderers.MenuItem
			{...item}
			key={index}
			eventKey={item}
			onClick={wrapOnClick(item)}
			title={item.title || item.label}
			className={classNames(theme['tc-dropdown-item'], 'tc-dropdown-item')}
		>
			{item.icon && <Icon name={item.icon} />}
			{!item.hideLabel && item.label}
		</Renderers.MenuItem>
	);
}

function getMenuItem(item, index, getComponent) {
	if (Iterable.isIterable(item)) {
		return renderMutableMenuItem(item.toJS(), index, getComponent);
	}

	return renderMutableMenuItem(item, index, getComponent);
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
class ActionDropdown extends React.Component {
	constructor(props) {
		super(props);
		this.onToggle = this.onToggle.bind(this);
		this.state = {
			dropup: false,
		};
	}

	onToggle(isOpen, event) {
		if (!isOpen) {
			return;
		}
		const dropdownTrigger = event.target;
		const dropdownMenu = event.target.nextSibling;
		let dropdownContainer = dropdownTrigger.parentElement;
		while (dropdownContainer && !dropdownContainer.classList.contains('tc-dropdown-container')) {
			dropdownContainer = dropdownContainer.parentElement;
		}

		if (dropdownContainer) {
			const dropdownRect = dropdownMenu.getBoundingClientRect();
			const containerRect = dropdownContainer.getBoundingClientRect();

			const dropup = containerRect.bottom < dropdownRect.bottom;
			this.setState({ dropup });
		}
	}

	render() {
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
			className,
			...rest
		} = this.props;

		const Renderers = Inject.getAll(getComponent, { MenuItem, DropdownButton });
		const injected = Inject.all(getComponent, components, InjectDropdownMenuItem);
		const title = (
			<span className="tc-dropdown-button-title">
				{icon ? <Icon name={icon} /> : null}
				{hideLabel ? null : <span className="tc-dropdown-button-title-label">{label}</span>}
			</span>
		);
		const style = link ? 'link' : bsStyle;

		function onItemSelect(object, event) {
			if (onSelect) {
				onSelect(event, object);
			}
		}

		const dropdown = (
			<Renderers.DropdownButton
				title={title}
				bsStyle={style}
				role="button"
				onSelect={onItemSelect}
				className={classNames(theme['tc-dropdown-button'], 'tc-dropdown-button', className)}
				aria-label={tooltipLabel || label}
				{...rest}
				ref="trigger"
				dropup={this.state.dropup}
				onToggle={this.onToggle}
			>
				{!items.length &&
					!items.size &&
					!components && <Renderers.MenuItem disabled>No options</Renderers.MenuItem>}
				{injected('beforeItemsDropdown')}
				{items.map((item, key) => getMenuItem(item, key, getComponent))}
				{injected('itemsDropdown')}
				{injected('afterItemsDropdown')}
			</Renderers.DropdownButton>
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
}

ActionDropdown.displayName = 'ActionDropdown';

ActionDropdown.propTypes = {
	bsStyle: PropTypes.string,
	className: PropTypes.string,
	hideLabel: PropTypes.bool,
	noCaret: PropTypes.bool,
	pullRight: PropTypes.bool,
	icon: PropTypes.string,
	items: PropTypes.oneOfType([
		PropTypes.arrayOf(
			PropTypes.shape({
				icon: PropTypes.string,
				label: PropTypes.string,
				...MenuItem.propTypes,
			}),
		),
		ImmutablePropTypes.list,
	]).isRequired,
	label: PropTypes.string.isRequired,
	link: PropTypes.bool,
	onSelect: PropTypes.func,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
	tooltipLabel: PropTypes.string,
	getComponent: PropTypes.func,
	components: PropTypes.shape({
		beforeItemsDropdown: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
		itemsDropdown: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
		afterItemsDropdown: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	}),
};

ActionDropdown.defaultProps = {
	bsStyle: 'default',
	tooltipPlacement: 'top',
	items: [],
};

export { ActionDropdown as default, getMenuItem, InjectDropdownMenuItem };
