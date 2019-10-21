import React from 'react';
// import classNames from 'classnames';
import PropTypes from 'prop-types';
import { submitEvent } from 'react-virtualized-tree/lib/eventWrappers';
import { getNodeRenderOptions, updateNode } from 'react-virtualized-tree/lib/selectors/nodes';
import { Renderer } from 'react-virtualized-tree/lib/shapes/rendererShapes';
import classNames from 'classnames';
import get from 'lodash/get';

import { Checkbox } from '../../Toggle';
import theme from './ThreeState.scss';

const SELECT = 3;

function threeStateFlow(checked) {
	if (checked === 'intermediate') {
		return false;
	} else if (checked === true) {
		return false;
	}

	return true;
}

const ThreeState = ({ onChange, node, children, index }) => {
	// debugger;
	const { hasChildren } = getNodeRenderOptions(node);
	const selected = get(node, 'state', {}).selected;
	console.log('three state', selected);
	console.log('node', node);
	/*const className = classNames({
		[iconsClassNameMap.expanded]: hasChildren && isExpanded,
		[iconsClassNameMap.collapsed]: hasChildren && !isExpanded,
		[iconsClassNameMap.lastChild]: !hasChildren,
	});
*/
	const updatedSelectionValue = threeStateFlow(selected);
	const classname = classNames({
		[theme['tc-threestate']]: true,
	});
	/*const handleChange = () =>
		onChange({ ...updateNode(node, { checked: updatedSelectionValue }), index });
	*/

	const onChangeWrapper = () =>
		onChange({
			node: {
				...node,
				state: {
					...(node.state || {}),
					selected: threeStateFlow(selected),
				},
			},
			type: SELECT,
		});
	const expampleHandleChange = () =>
		onChange({
			node: {
				...node,
				state: {
					...(node.state || {}),
					selected: !selected,
				},
			},
			type: SELECT,
		});
	const id = index && `${index}-toggle`;
	return (
		<span>
			{!hasChildren && (
				<Checkbox
					key={id}
					id={id}
					onChange={onChangeWrapper}
					tabIndex="-1"
					checked={updatedSelectionValue}
					className={classname}
				/>
			)}
			{children}
		</span>
	);
};

// <i tabIndex={0} onKeyDown={submitEvent(handleChange)} onClick={handleChange} className={className} />

ThreeState.propTypes = {
	...Renderer,
	iconsClassNameMap: PropTypes.shape({
		expanded: PropTypes.string,
		collapsed: PropTypes.string,
		lastChild: PropTypes.string,
	}),
};

export default ThreeState;
