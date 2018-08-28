import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Action } from '../';
import TreeViewItem from './TreeViewItem/';

import theme from './TreeView.scss';

/**
 * A view component to display any tree structure, like folders or categories.
 *
 * @param id, for qa purposes
 * @param structure optional, tree structure to display, see example below
 * @param headerText optional, specifies text in component's header
 * @param addAction optional, defines if 'add' button is displayed and
 *        specifies button click event callback
 * @param addActionLabel optional, specifies tooltip label for 'add' button
 * @param itemSelectCallback required, tree item click event callback function
 * @param itemToggleCallback required, tree item expand/collapse event callback function
 *
 * const defaultProps = {
 * 	structure: [{
 * 		name: 'grandpa',
 * 		children: [
 * 			{
 * 				name: 'mami',
 * 				toggled: true,
 * 				children: [
 * 					{ name: 'me', selected: true },
 * 					{ name: 'bro' },
 * 				],
 * 			},
 * 			{ name: 'aunt', toggled: false, children: [{ name: 'cousin' }] },
 * 		],
 * 		toggled: true
 * 	}],
 * 	headerText: 'some elements',
 * 	addAction: () => null,
 * 	addActionLabel: 'add element',
 * 	itemSelectCallback: () => null,
 * 	itemToggleCallback: () => null,
 * }
 *
 * <TreeView {...defaultProps} />
 *
 */
class TreeView extends React.Component {
	constructor(props) {
		super(props);

		if (props.onClick && process.env.NODE_ENV !== 'production') {
			console.warn(
				'Treeview: props.onClick is deprecated please use onToggle that is way more explicit',
			);
		}
	}

	render() {
		const {
			id,
			headerText,
			structure,
			addAction,
			addActionLabel,
			onClick,
			onSelect,
			onToggle,
			noHeader,
			className,
			style,
		} = this.props;
		return (
			<div className={classNames('tc-treeview', theme['tc-treeview'], className)} style={style}>
				{!noHeader && (
					<header className={theme['tc-treeview-header']}>
						<span>{headerText}</span>
						{addAction && (
							<Action
								label={addActionLabel}
								icon="talend-plus"
								onClick={addAction}
								tooltipPlacement="right"
								hideLabel
								link
								id={id && `${id}-add`}
								key={addActionLabel}
							/>
						)}
					</header>
				)}
				<nav className={`${theme['tc-treeview-nav']} tc-treeview-nav`}>
					<ul className={theme['tc-treeview-ul']}>
						{structure.map((item, i) => (
							<TreeViewItem
								id={id && `${id}-${i}`}
								item={item}
								onSelect={onSelect}
								onToggle={onToggle || onClick}
								key={i}
							/>
						))}
					</ul>
				</nav>
			</div>
		);
	}
}

TreeView.displayName = 'TreeView';

TreeView.defaultProps = {
	id: 'tc-treeview',
	addActionLabel: 'Add folder',
	headerText: 'Folders',
};

if (process.env.NODE_ENV !== 'production') {
	TreeView.propTypes = {
		id: PropTypes.string,
		headerText: PropTypes.string,
		structure: PropTypes.arrayOf(TreeViewItem.propTypes.item),
		addAction: PropTypes.func,
		addActionLabel: PropTypes.string,
		onClick: PropTypes.func, // deprecated, use onToggle
		onToggle: PropTypes.func.isRequired,
		onSelect: PropTypes.func.isRequired,
		noHeader: PropTypes.bool,
		className: PropTypes.string,
		style: PropTypes.object,
	};
}

export default TreeView;
