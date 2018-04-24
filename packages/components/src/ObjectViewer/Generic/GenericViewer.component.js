import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import HierarchicTree from './HierarchicTree';
import theme from './GenericViewer.scss';

export default function GenericViewer({ className, title, ...props }) {
	return (
		<div className={classNames(theme['tc-hierarchic'], 'tc-hierarchic', className)}>
			<HierarchicTree {...props} dataKey={title} jsonpath={'$'} value={props.data} level={0} />
		</div>
	);
}
GenericViewer.propTypes = {
	className: PropTypes.string,
	data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
