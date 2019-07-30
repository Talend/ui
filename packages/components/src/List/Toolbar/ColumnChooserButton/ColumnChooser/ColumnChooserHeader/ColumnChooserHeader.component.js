import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from '../ColumnChooser.scss';
import { useColumnChooserContext } from '../columnChooser.context';
import Tooltip from '../../../../../Tooltip';

const ColumnChooserHeader = ({ className, children }) => {
	const { id, t } = useColumnChooserContext();
	const title = t('COLUMN_CHOOSER_HEADER_TITLE', {
		defaultValue: 'Modify columns',
	});
	return (
		<Tooltip.Header
			className={classNames(
				className,
				theme['tc-column-chooser-header'],
				'tc-column-chooser-header',
			)}
			id={id}
		>
			{!children ? title : children}
		</Tooltip.Header>
	);
};

ColumnChooserHeader.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
	className: PropTypes.string,
};

export default ColumnChooserHeader;
