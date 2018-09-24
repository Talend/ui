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

function focusOn(event, element) {
	event.stopPropagation();
	if (element) {
		element.focus();
	}
}

/**
 * Internal: you should not use it
 * Single item of TreeView component
 *
 * @param id, for qa purposes
 * @param item required, item to display
 * 		  item.actions optional, array with actions' to be displayed meta-info
 * @param onSelect required, callback function to trigger once item was clicked
 * @param onClick required, callback function to trigger once item was clicked
 *
 * @returns XML, jsx to display
 */

class TreeViewItem extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		index: PropTypes.number.isRequired,
		item: PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			name: PropTypes.string.isRequired,
			toggled: PropTypes.bool,
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
		itemSiblings: PropTypes.array,
		level: PropTypes.number.isRequired,
		onToggle: PropTypes.func.isRequired,
		onToggleAllSiblings: PropTypes.func.isRequired,
		onSelect: PropTypes.func.isRequired,
		selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
	};

	static defaultProps = {
		level: 1,
	};

	constructor(props) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
		this.onToggle = this.onToggle.bind(this);
		this.onToggleAllSiblings = this.onToggleAllSiblings.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.renderIconAction = this.renderIconAction.bind(this);
		this.renderTreeViewChildren = this.renderTreeViewChildren.bind(this);
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
				this.onSelect(event);
				break;
			case keycode.codes.left:
				if (this.hasChildren() && this.props.item.toggled) {
					this.onToggle(event);
				} else if (!this.hasChildren() || !this.props.item.toggled) {
					focusOn(event, this.getParentItem());
				}
				break;
			case keycode.codes.right:
				if (this.hasChildren() && !this.props.item.toggled) {
					this.onToggle(event);
				} else if (this.hasChildren() && this.props.item.toggled) {
					focusOn(event, this.getFirstChildItem());
				}
				break;
			case keycode.codes.down:
				focusOn(event, this.getNextItem());
				break;
			case keycode.codes.up:
				focusOn(event, this.getPreviousItem());
				break;
			case keycode.codes.home:
				focusOn(event, this.getFirstItem());
				break;
			case keycode.codes.end:
				focusOn(event, this.getLastItem());
				break;
			case keycode.codes['numpad *']:
				this.onToggleAllSiblings(event);
				break;
			default:
				break;
		}
	}

	onToggleAllSiblings(event) {
		event.stopPropagation();
		return this.props.onToggleAllSiblings(this.props.itemSiblings);
	}

	onSelect(event) {
		event.stopPropagation();
		return this.props.onSelect(this.props.item);
	}

	onToggle(event) {
		event.stopPropagation();
		return this.props.onToggle(this.props.item);
	}

	getAllItems() {
		return this.containerRef.closest('ul[role="tree"]').querySelectorAll('li[role="treeitem"]');
	}

	getFirstItem() {
		return this.containerRef.closest('ul[role="tree"]').querySelector('li[role="treeitem"]');
	}

	getLastItem() {
		const nodes = this.getAllItems();
		return nodes.item(nodes.length - 1);
	}

	getParentItem() {
		return this.containerRef.parentElement.closest('li[role="treeitem"]');
	}

	getFirstChildItem() {
		return this.containerRef.querySelector('li[role="treeitem"]');
	}

	getNextItem() {
		let nextElement;
		let currentFound;
		let hasNext;

		const nodes = this.getAllItems().values();

		do {
			const { value, done } = nodes.next();

			if (currentFound) {
				nextElement = value;
				hasNext = false;
			} else {
				currentFound = value === this.containerRef;
				hasNext = !done;
			}
		} while (hasNext);

		return nextElement;
	}

	getPreviousItem() {
		let previousElement;
		let hasNext;

		const nodes = this.getAllItems().values();

		do {
			const { value, done } = nodes.next();
			const currentFound = value === this.containerRef;

			if (currentFound) {
				hasNext = false;
			} else {
				previousElement = value;
				hasNext = !done;
			}
		} while (hasNext);

		return previousElement;
	}

	getTabIndex() {
		let shouldBeFocusable;
		if (this.props.selectedId === undefined) {
			shouldBeFocusable = this.props.index === 0;
		} else {
			shouldBeFocusable = this.isSelected();
		}

		return shouldBeFocusable ? 0 : -1;
	}

	hasChildren() {
		return this.props.item.children && this.props.item.children.length;
	}

	isSelected() {
		const { item, selectedId } = this.props;
		if (selectedId === undefined) {
			return false;
		}
		if (Array.isArray(selectedId)) {
			return selectedId.includes(item.id);
		}
		return item.id === selectedId;
	}

	isToggled() {
		const { children = [], toggled = false } = this.props.item;
		if (!children.length) {
			return undefined;
		}
		return toggled;
	}

	renderTreeViewChildren() {
		if (!this.isToggled()) {
			return null;
		}

		const { children } = this.props.item;
		return (
			<ul key="children" role="group" className={css['tc-treeview-ul']}>
				{children.map((child, i) => (
					<TreeViewItem
						id={this.props.id && `${this.props.id}-${i}`}
						item={child}
						itemSiblings={children}
						onSelect={this.props.onSelect}
						onToggle={this.props.onToggle}
						onToggleAllSiblings={this.props.onToggleAllSiblings}
						key={i}
						index={i + 1}
						selectedId={this.props.selectedId}
						level={this.props.level + 1}
					/>
				))}
			</ul>
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
		const { id, index, item, level, itemSiblings } = this.props;
		const {
			toggled = false,
			hidden,
			name,
			children = [],
			showCounter,
			actions,
			icon,
			counter = children.length,
		} = item;
		const paddingLeft = `${(level - 1) * (PADDING + CARET_WIDTH) + BASE_PADDING}px`;
		const showOpenedFolder = !!(children.length && (toggled || this.state.hovered));

		return (
			<li // eslint-disable-line jsx-a11y/no-static-element-interactions
				id={id}
				role="treeitem"
				tabIndex={this.getTabIndex()}
				aria-expanded={this.isToggled()}
				aria-level={level}
				aria-posinset={index}
				aria-setsize={itemSiblings.length}
				aria-selected={this.isSelected()}
				className={classNames('tc-treeview-item-li', css['tc-treeview-li'])}
				onClick={this.onSelect}
				onKeyDown={this.onKeyDown}
				data-hidden={hidden}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
				ref={ref => {
					this.containerRef = ref;
				}}
			>
				<div
					className={classNames('tc-treeview-item', css['tc-treeview-item'])}
					style={{ paddingLeft }}
				>
					{children.length ? (
						<Action
							key="toggle"
							className={css['tc-treeview-toggle']}
							icon="talend-caret-down"
							iconTransform={toggled ? undefined : 'rotate-270'}
							id={id && `${id}-toggle`}
							onClick={this.onToggle}
							label=""
							aria-hidden
							tabIndex="-1"
							link
						/>
					) : null}
					<TreeViewIcon key="icon" icon={icon} toggled={showOpenedFolder} />
					<span
						key="label"
						className={classNames('tc-treeview-item-name', css['tc-treeview-item-name'])}
					>
						{name}
					</span>
					<div key="actions" className={css['tc-treeview-item-ctrl']}>
						{showCounter && <Badge key="badge" label={counter.toString()} />}
						{actions && actions.map(this.renderIconAction)}
					</div>
				</div>
				{this.renderTreeViewChildren()}
			</li>
		);
	}
}

export default TreeViewItem;
