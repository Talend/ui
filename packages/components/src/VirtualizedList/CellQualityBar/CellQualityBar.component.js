import React from 'react';
import QualityBar from '../../QualityBar';

export const CellQualityBar = ({ cellData }) => cellData && <QualityBar {...cellData} /> || null;

CellQualityBar.displayName = 'VirtualizedList(CellQualityBar)';
CellQualityBar.propTypes = {
	cellData: QualityBar.propTypes.isRequired,
};
