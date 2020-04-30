import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../../Icon';
import { getTheme } from '../../theme';
import theme from './CellIconText.scss';

const css = getTheme(theme);

/**
 * Cell renderer that displays a boolean
 */
class CellIconText extends React.Component {
	shouldComponentUpdate(nextProps) {
		return this.props.cellData !== nextProps.cellData;
	}

	render() {
		const { cellData } = this.props;

		return (
			<div className={css('tc-icon-text')}>
				{cellData.icon && <Icon name={cellData.icon} />}
				<span className={theme.label}>{cellData.label}</span>
			</div>
		);
	}
}

CellIconText.displayName = 'VirtualizedList(CellIconText)';
CellIconText.propTypes = {
	// The cell value : props.rowData[props.dataKey]
	cellData: PropTypes.shape({
		label: PropTypes.string,
		icon: PropTypes.string,
	}),
};

CellIconText.defaultProps = {
	cellData: {},
};

export default CellIconText;
