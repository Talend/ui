import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';
import { Iterable } from 'immutable';
import { DropdownButton, MenuItem, OverlayTrigger } from 'react-bootstrap';
import { translate } from 'react-i18next';
import omit from 'lodash/omit';
import Inject from '../../Inject';
import theme from './ActionDropdown.scss';
import TooltipTrigger from '../../TooltipTrigger';
import Icon from '../../Icon';
import { wrapOnClick } from '../Action/Action.component';
import CircularProgress from '../../CircularProgress/CircularProgress.component';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import getDefaultT from '../../translate';

export const DROPDOWN_CONTAINER_CN = 'tc-dropdown-container';

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

function getDropdownContainer(dropdownElement) {
	let dropdownContainer = dropdownElement;
	do {
		dropdownContainer = dropdownContainer.parentElement;
	} while (
		dropdownContainer &&
		dropdownContainer.tagName !== 'BODY' &&
		!dropdownContainer.classList.contains(DROPDOWN_CONTAINER_CN)
	);
	return dropdownContainer;
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
		this.state = {};
	}

	componentDidUpdate(prevProps, prevState) {
		/*
		Dropdown/Dropup automatic switch:
		depending on its position with a defined container, it will switch from down and up mode.

		By default it checks its position with the <body>.
		Specific container support with "tc-dropdown-container" classname on the parent container.
		 */
		if (!prevState.isOpen && this.state.isOpen) {
			// eslint-disable-next-line react/no-find-dom-node
			const dropdown = ReactDOM.findDOMNode(this.ref);
			const dropdownTrigger = dropdown.querySelector('.dropdown-toggle');
			const dropdownMenu = dropdownTrigger.nextSibling;
			const dropdownContainer = getDropdownContainer(dropdownTrigger);

			if (dropdownContainer) {
				const dropdownRect = dropdownMenu.getBoundingClientRect();
				const containerRect = dropdownContainer.getBoundingClientRect();
				if (!dropdown.classList.contains('dropup') && dropdownRect.bottom > containerRect.bottom) {
					dropdown.classList.add('dropup');
				} else if (dropdown.classList.contains('dropup') && dropdownRect.top < containerRect.top) {
					dropdown.classList.remove('dropup');
				}
			}
		}
	}

	onToggle(isOpen) {
		this.setState({ isOpen }, () => {
			if (this.props.onToggle) {
				this.props.onToggle(isOpen);
			}
		});
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
			loading,
			t,
			...rest
		} = this.props;

		const Renderers = Inject.getAll(getComponent, { MenuItem, DropdownButton });
		const injected = Inject.all(getComponent, components, InjectDropdownMenuItem);
		const title = [
			icon ? <Icon name={icon} key={'icon'} /> : null,
			hideLabel ? null : (
				<span className="tc-dropdown-button-title-label" key={'label'}>
					{label}
				</span>
			),
		];
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
				{...omit(rest, 'tReady')}
				onToggle={this.onToggle}
				ref={ref => (this.ref = ref)}
			>
				{!items.length &&
					!items.size &&
					!loading &&
					!components && (
						<Renderers.MenuItem key="empty" disabled>
							{t('ACTION_DROPDOWN_EMPTY', { defaultValue: 'No options' })}
						</Renderers.MenuItem>
					)}
				{injected('beforeItemsDropdown')}
				{items.map((item, key) => getMenuItem(item, key, getComponent))}
				{loading && (
					<Renderers.MenuItem
						key={items ? items.length + 1 : 0}
						header
						className={classNames(
							theme['tc-dropdown-item'],
							'tc-dropdown-item',
							theme['tc-dropdown-loader'],
							'tc-dropdown-loader',
						)}
					>
						<CircularProgress />
					</Renderers.MenuItem>
				)}
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
	dropup: PropTypes.bool,
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
	loading: PropTypes.bool,
	onToggle: PropTypes.func,
	onSelect: PropTypes.func,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
	tooltipLabel: PropTypes.string,
	getComponent: PropTypes.func,
	components: PropTypes.shape({
		beforeItemsDropdown: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
		itemsDropdown: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
		afterItemsDropdown: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	}),
	t: PropTypes.func,
};

ActionDropdown.defaultProps = {
	bsStyle: 'default',
	tooltipPlacement: 'top',
	items: [],
	t: getDefaultT(),
};

export { getMenuItem, InjectDropdownMenuItem };
export default translate(I18N_DOMAIN_COMPONENTS)(ActionDropdown);
