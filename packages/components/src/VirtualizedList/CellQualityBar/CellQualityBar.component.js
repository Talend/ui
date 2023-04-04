import PropTypes from 'prop-types';
import { QualityBar } from '../../QualityBar';

export const CellQualityBar = ({ cellData }) => (cellData && <QualityBar {...cellData} />) || null;

CellQualityBar.displayName = 'VirtualizedList(CellQualityBar)';
CellQualityBar.propTypes = {
	cellData: PropTypes.shape({
		invalid: PropTypes.number,
		empty: PropTypes.number,
		valid: PropTypes.number,
		na: PropTypes.number,
	}),
};
