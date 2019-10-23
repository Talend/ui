import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { submitEvent } from 'react-virtualized-tree/lib/eventWrappers';
import { getNodeRenderOptions, updateNode } from 'react-virtualized-tree/lib//selectors/nodes';
import { Renderer } from 'react-virtualized-tree/lib/shapes/rendererShapes';

import Action from '../Actions/Action';

import css from './Expandable.scss';

const Expandable = ({
	onChange,
	node,
	children,
	index,
	/*	iconsClassNameMap = {
		expanded: 'mi mi-keyboard-arrow-down',
		collapsed: 'mi mi-keyboard-arrow-right',
		lastChild: '',
	},*/
}) => {
	const { hasChildren, isExpanded } = getNodeRenderOptions(node);
	/*	const className = classNames({
		[iconsClassNameMap.expanded]: hasChildren && isExpanded,
		[iconsClassNameMap.collapsed]: hasChildren && !isExpanded,
		[iconsClassNameMap.lastChild]: !hasChildren,
	});
*/
	const className = classNames(css['tc-virtual-treeview-toggle'], 'tc-virtual-treeview-toggle');
	const handleChange = () => onChange({ ...updateNode(node, { expanded: !isExpanded }), index });
	return (
		<div style={{ width: '100%', height: '30px' }}>
			{hasChildren && (
				<Action
					displayMode="iconToggle"
					key="toggle"
					// className={css['tc-treeview-toggle']}
					className={className}
					icon="talend-caret-down"
					iconTransform={isExpanded ? undefined : 'rotate-270'}
					id={index && `${index}-toggle`}
					onKeyDown={submitEvent(handleChange)}
					onClick={handleChange}
					aria-hidden
					tabIndex="-1"
					link
				/>
			)}

			{children}
		</div>
	);
	/*
	//{!hasChildren && <div className={css['tc-expand-placeholder']} />}
	return (
		<span onDoubleClick={handleChange}>
			{hasChildren && (
				<i
					tabIndex={0}
					onKeyDown={submitEvent(handleChange)}
					onClick={handleChange}
					className={className}
				/>
			)}
			{children}
		</span>
	);
*/
};

Expandable.propTypes = {
	...Renderer,
	iconsClassNameMap: PropTypes.shape({
		expanded: PropTypes.string,
		collapsed: PropTypes.string,
		lastChild: PropTypes.string,
	}),
};

export default Expandable;
