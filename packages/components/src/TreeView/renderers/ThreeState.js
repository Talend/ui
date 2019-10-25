import React from 'react';
// import classNames from 'classnames';
import PropTypes from 'prop-types';
import { submitEvent } from 'react-virtualized-tree/lib/eventWrappers';
import { getNodeRenderOptions, updateNode } from 'react-virtualized-tree/lib/selectors/nodes';
import { Renderer } from 'react-virtualized-tree/lib/shapes/rendererShapes';
import classNames from 'classnames';
import get from 'lodash/get';

import { Checkbox } from '../../Toggle';

//import { Checkbox } from '../../Toggle/index';
import theme from './ThreeState.scss';

const SELECT = 3;

function threeStateFlow(checked) {
	if (checked === 'intermediate') {
		return false;
	} else if (checked === true) {
		return false;
	} else if (checked === false) {
		return true;
	}

	return checked;
}

const ThreeState = props => {
	const { onChange, node, children, index } = props;
	//console.log('three state on index', index);
	const { hasChildren } = getNodeRenderOptions(node);
	const selected = get(node, 'state', {}).selected;
	//const updatedSelectionValue = selected;
	const updatedSelectionValue = selected;
	//const updatedSelectionValue = threeStateFlow(selected);
	const classname = classNames({
		[theme['tc-threestate']]: true,
	});

	const onThreeStateChangeWrapper = () => {
		//console.log('index', index);
		onChange({
			node: {
				...node,
				state: {
					...(node.state || {}),
					selected: updatedSelectionValue,
				},
			},
//			index,
			type: SELECT,
		});
	};
	/*	const expampleHandleChange = () =>
		onChange({
			node: {
				...node,
				state: {
					...(node.state || {}),
					selected: !selected,
				},
			},
			type: SELECT,
		});*/
	const id = index && `${index}-toggle`;
	return (
		<span style={{ marginLeft: '30px' }}>
			{
				<Checkbox
					key={id}
					id={id}
					onChange={onThreeStateChangeWrapper}
					tabIndex="-1"
					checked={updatedSelectionValue}
					className={classname}
					intermediate={updatedSelectionValue === 1 || updatedSelectionValue === 'intermediate'}
				/>
			}
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
