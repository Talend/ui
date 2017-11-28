import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import keycode from 'keycode';

import { Action } from '../../Actions';
import Icon from '../../Icon';
import Badge from '../../Badge';

import css from './TreeViewItem.scss';

const PADDING_NORMAL = 15;
const PADDING_LARGE = 20;

/**
* return the default open or closed folder icon if non is specified on item
* or if it is specified return the specified icon with `-closed` append if not toggled
* @param {String} icon - icon name
* @param {Boolean} toggled - state of the item
* @return {String}
*/
export function getItemIcon(itemIcon = 'talend-folder', itemStateToggled) {
	return itemStateToggled ? itemIcon : `${itemIcon}-closed`;
}

/**
 *
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
			icon: PropTypes.string,
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
		id: 'tc-treeview-item',
		depth: 0,
	};

	constructor(props) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.renderTreeViewItem = this.renderTreeViewItem.bind(this);
	}

	onKeyDown(event) {
		if (event.keyCode === keycode.codes.enter) {
			this.onSelect();
		}
	}

	onSelect() {
		this.elementRef.focus();
		this.props.onClick(this.props.item);
		return this.props.onSelect(this.props.item);
	}

	renderTreeViewItem(child, i) {
		return (
			<TreeViewItem
				id={`${this.props.id}-${i}`}
				item={child}
				onSelect={this.props.onSelect}
				onClick={this.props.onClick}
				depth={this.props.depth + 1}
				key={i}
			/>
		);
	}

	renderIconAction(label, icon_, action, id_) {
		return (
			<Action
				label={label}
				icon={icon_}
				onClick={event => {
					event.stopPropagation();
					action(this.props.item);
				}}
				tooltipPlacement="right"
				hideLabel
				key={label}
				id={id_ || `${this.props.id}-${icon_}`}
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
		const toggleIconLabel = toggled ? 'Collapse' : 'Expand';

		const paddingLeft = `${depth * PADDING_NORMAL + PADDING_LARGE}px`;

		return (
			<li className={classNames('tc-treeview-item-li', css['tc-treeview-li'])} data-hidden={hidden}>
				<div // eslint-disable-line jsx-a11y/no-static-element-interactions
					className={classNames('tc-treeview-item', css['tc-treeview-item'])}
					data-selected={selected}
					onClick={this.onSelect}
					id={id}
					style={{ paddingLeft }}
					role="button"
					tabIndex="0"
					ref={element => { this.elementRef = element; }}
					onKeyDown={this.onKeyDown}
				>
					{!children.length || (
						<Icon className={css['tc-treeview-toggle']} name="talend-caret-down" transform={toggled ? undefined : 'rotate-270'} title={toggleIconLabel} />
					)}
					<Icon name={getItemIcon(icon, toggled)} className={css['tc-treeview-folder']} />
					<span className="tc-treeview-item-name">{name}</span>
					<div className={css['tc-treeview-item-ctrl']}>
						{showCounter && <Badge label={counter.toString()} />}
						{actions && actions.map(a => this.renderIconAction(a.label, a.icon, a.action))}
					</div>
				</div>
				{children &&
					toggled && <ul className={css['tc-treeview-ul']}>{children.map(this.renderTreeViewItem)}</ul>}
			</li>
		);
	}
}

export default TreeViewItem;
