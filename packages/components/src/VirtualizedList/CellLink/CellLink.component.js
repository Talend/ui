import PropTypes from 'prop-types';
import { Link } from '@talend/design-system';
import TooltipTrigger from '../../TooltipTrigger';
import styles from './CellLink.module.css';
import classNames from 'classnames';
/**
 * Cell renderer that displays a link
 */
function CellLink({ cellData, rowData, columnData, className }) {
	let cellColumnData = columnData;
	if (typeof columnData === 'function') {
		cellColumnData = columnData(rowData);
	}
	const linkRender = (
		<div className={classNames(className, styles['cell-link-container'])}>
			<Link {...columnData} as={cellColumnData.linkAs}>
				{cellData}
			</Link>
		</div>
	);

	return !!cellColumnData.tooltip ? (
		<TooltipTrigger label={cellColumnData.tooltip} tooltipPlacement="top">
			{linkRender}
		</TooltipTrigger>
	) : (
		linkRender
	);
}

CellLink.displayName = 'VirtualizedList(CellLink)';
CellLink.propTypes = {
	cellData: PropTypes.string,
	className: PropTypes.string,
	columnData: PropTypes.object,
	rowData: PropTypes.object,
};

export default CellLink;
