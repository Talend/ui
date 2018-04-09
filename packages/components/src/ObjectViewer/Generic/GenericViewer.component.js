import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TreeItem from './TreeItem';
import // defaultGetDataType,
// defaultGetDisplayKey,
// defaultGetDisplayValue,
// defaultGetFields,
// defaultGetIcon,
// defaultGetJSONPath,
// defaultGetQuality,
'./genericViewer.configuration';
// import Icon from '../../Icon';
import theme from './GenericViewer.scss';

export default function GenericViewer({ className, style, title, ...props }) {
	/*
		Could we used inject to add custom leaf and branch ?
		if components.leaf => Inject.get(getComponent, components.leaf, components.props) ?
	*/
	const cn = classNames(theme['tc-viewer'], 'tc-object-viewer', className);
	return (
		<ul className={cn} style={style}>
			<TreeItem {...props} dataKey={title} jsonpath={'$'} value={props.data} level={0} />
		</ul>
	);
}
GenericViewer.propTypes = {
	className: PropTypes.string,
	data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	style: PropTypes.object,
};
