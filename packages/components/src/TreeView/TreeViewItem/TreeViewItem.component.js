import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import keycode from 'keycode';

import { Action } from '../../Actions';
import Icon from '../../Icon';
import Badge from '../../Badge';

import css from './TreeViewItem.scss';

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
		onClick: PropTypes.func.isRequired,
		onSelect: PropTypes.func.isRequired,
		depth: PropTypes.number,
	};

	static defaultProps = {
		depth: 0,
	};

	constructor(props) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
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
		if (event.keyCode === keycode.codes.enter) {
			this.onSelect();
		}
	}

	onSelect() {
		this.containerRef.focus();
		this.props.onClick(this.props.item);
		return this.props.onSelect(this.props.item);
	}

	renderTreeViewItem(child, i) {
		return (
			<TreeViewItem
				id={this.props.id && `${this.props.id}-${i}`}
				item={child}
				onSelect={this.props.onSelect}
				onClick={this.props.onClick}
				depth={this.props.depth + 1}
				key={i}
			/>
		);
	}

	renderIconAction(label, icon, action, id) {
		let safeId = id;
		if (!id && this.props.id) {
			safeId = `${this.props.id}-${icon}`;
		}
		return (
			<Action
				label={label}
				icon={icon}
				onClick={event => {
					event.stopPropagation();
					action(this.props.item);
				}}
				tooltipPlacement="right"
				hideLabel
				key={label}
				id={safeId}
				link
			/>
		);
	}

	render() {
		const { id, item, depth = 0 } = this.props;
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
		const toggleIconLabel = toggled ? 'Collapse' : 'Expand';
		const shouldShowToggledIcon = !!(children.length && (toggled || this.state.hovered));

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
						<Icon
							className={css['tc-treeview-toggle']}
							name="talend-caret-down"
							transform={toggled ? undefined : 'rotate-270'}
							title={toggleIconLabel}
						/>
					)}
					<TreeViewIcon icon={icon} toggled={shouldShowToggledIcon} />
					<span className="tc-treeview-item-name">{name}</span>
					<div className={css['tc-treeview-item-ctrl']}>
						{showCounter && <Badge label={counter.toString()} />}
						{actions && actions.map(a => this.renderIconAction(a.label, a.icon, a.action, a.id))}
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
