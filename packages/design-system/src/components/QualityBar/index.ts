import { QualityBar as QualityBarComponent } from './QualityBar.component';
import { QualityCommonProps, QualityType } from './QualityBar.types';
import { formatNumber, getQualityPercentagesRounded } from './QualityRatioBar.utils';

export type QualityBarType = typeof QualityBarComponent & {
	QualityType: typeof QualityType;
	formatNumber: typeof formatNumber;
	getQualityPercentagesRounded: typeof getQualityPercentagesRounded;
};

const QualityBar = QualityBarComponent as QualityBarType;
QualityBar.QualityType = QualityType;
QualityBar.formatNumber = formatNumber;
QualityBar.getQualityPercentagesRounded = getQualityPercentagesRounded;

export { QualityBar, QualityType };
export type { QualityCommonProps };
