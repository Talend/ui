import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import keycode from 'keycode';

import { Action } from '../../Actions';
import Icon from '../../Icon';
import Badge from '../../Badge';

import css from './TreeViewItem.scss';
import getDefaultT from '../../translate';

const BASE_PADDING = 30;
const CARET_WIDTH = 12;
const PADDING = 20;

/**
 * return the default open or closed folder icon if non is specified on item
 * or if it is specified return the specified icon with `-closed` append if not toggled
 * @param {String} iconName - icon name
 * @param {Boolean} toggled - state of the item
 * @return {String}
 */
export function getItemIcon(iconName = 'talend-folder', toggled) {
	return toggled ? iconName : `${iconName}-closed`;
}

/**
 * Internal: you should not use it
 * Instantiate an icon based on the icon config
 *
 * @param icon The icon name of the Icon props
 * @param toggled if the treeview is toggled
 */
function TreeViewIcon({ icon, toggled }) {
	if (typeof icon === 'object') {
		return <Icon {...icon} className={classNames(css['tc-treeview-img'], icon.className)} />;
	}

	return (
		<Icon name={getItemIcon(icon, toggled)} className={classNames(css['tc-treeview-folder'])} />
	);
}
TreeViewIcon.propTypes = {
	icon: PropTypes.oneOfType([PropTypes.string, PropTypes.shape(Icon.propTypes)]),
	toggled: PropTypes.bool,
};

/**
 * Internal: you should not use it
 * Single item of TreeView component
 *
 * @param id, for qa purposes
 * @param item required, item to display
 * 		  item.actions optional, array with actions' to be displayed meta-info
 * @param onSelect required, callback function to trigger once item was clicked
 * @param onClick required, callback function to trigger once item was clicked
 * @param depth optional, depth of an item in a tree
 *
 * @returns XML, jsx to display
 */

class TreeViewItem extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		item: PropTypes.shape({
			name: PropTypes.string.isRequired,
			toggled: PropTypes.bool,
			selected: PropTypes.bool,
			children: PropTypes.arrayOf(PropTypes.object),
			icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
			actions: PropTypes.arrayOf(
				PropTypes.shape({
					action: PropTypes.func,
					label: PropTypes.string,
					icon: PropTypes.string,
				}),
			),
			counter: PropTypes.number,
			showCounter: PropTypes.bool,
		}).isRequired,
		onToggle: PropTypes.func.isRequired,
		onSelect: PropTypes.func.isRequired,
		depth: PropTypes.number,
		t: PropTypes.func,
	};

	static defaultProps = {
		depth: 0,
		t: getDefaultT(),
	};

	constructor(props) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
		this.onToggle = this.onToggle.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.renderIconAction = this.renderIconAction.bind(this);
		this.renderTreeViewItem = this.renderTreeViewItem.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.state = {
			hovered: false,
		};
	}

	onMouseEnter() {
		this.setState({
			hovered: true,
		});
	}

	onMouseLeave() {
		this.setState({
			hovered: false,
		});
	}

	onKeyDown(event) {
		switch (event.keyCode) {
			case keycode.codes.enter:
			case keycode.codes.space:
				this.onSelect();
				break;
			case keycode.codes.left:
				if (this.props.item.toggled) {
					this.onToggle(event);
				}
				break;
			case keycode.codes.right:
				if (!this.props.item.toggled) {
					this.onToggle(event);
				}
				break;
			default:
				break;
		}
	}

	onSelect() {
		this.containerRef.focus();
		return this.props.onSelect(this.props.item);
	}

	onToggle(event) {
		event.stopPropagation();
		return this.props.onToggle(this.props.item);
	}

	renderTreeViewItem(child, i) {
		return (
			<TreeViewItem
				id={this.props.id && `${this.props.id}-${i}`}
				item={child}
				onSelect={this.props.onSelect}
				onToggle={this.props.onToggle}
				depth={this.props.depth + 1}
				key={i}
			/>
		);
	}

	renderIconAction({ action, id, ...actionProps }) {
		let safeId = id;
		if (!id && this.props.id) {
			safeId = `${this.props.id}-${actionProps.icon}`;
		}
		return (
			<Action
				{...actionProps}
				onClick={event => {
					event.stopPropagation();
					action(this.props.item);
				}}
				tooltipPlacement="right"
				hideLabel
				key={actionProps.label}
				id={safeId}
				link
			/>
		);
	}

	render() {
		const { id, item, depth = 0, t } = this.props;
		const {
			toggled = false,
			selected,
			hidden,
			name,
			children = [],
			showCounter,
			actions,
			icon,
			counter = children.length,
		} = item;
		const paddingLeft = `${depth * (PADDING + CARET_WIDTH) + BASE_PADDING}px`;
		const shouldShowToggledIcon = !!(children.length && (toggled || this.state.hovered));
		const toggleLabel = toggled
			? t('TREEVIEW_EXPAND', { defaultValue: 'Show its sub elements' })
			: t('TREEVIEW_EXPAND', { defaultValue: 'Hide its sub elements' });

		return (
			<li
				className={classNames('tc-treeview-item-li', css['tc-treeview-li'])}
				data-hidden={hidden}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
			>
				<div // eslint-disable-line jsx-a11y/no-static-element-interactions
					className={classNames('tc-treeview-item', css['tc-treeview-item'])}
					data-selected={selected}
					onClick={this.onSelect}
					id={id}
					style={{ paddingLeft }}
					role="button"
					tabIndex="0"
					ref={element => {
						this.containerRef = element;
					}}
					onKeyDown={this.onKeyDown}
				>
					{!children.length || (
						<Action
							className={css['tc-treeview-toggle']}
							icon="talend-caret-down"
							iconTransform={toggled ? undefined : 'rotate-270'}
							onClick={this.onToggle}
							aria-label={toggleLabel}
							hideLabel
							link
						/>
					)}
					<TreeViewIcon icon={icon} toggled={shouldShowToggledIcon} />
					<span className={classNames('tc-treeview-item-name', css['tc-treeview-item-name'])}>
						{name}
					</span>
					<div className={css['tc-treeview-item-ctrl']}>
						{showCounter && <Badge label={counter.toString()} />}
						{actions && actions.map(this.renderIconAction)}
					</div>
				</div>
				{children &&
					toggled && (
						<ul className={css['tc-treeview-ul']}>{children.map(this.renderTreeViewItem)}</ul>
					)}
			</li>
		);
	}
}

export default TreeViewItem;
