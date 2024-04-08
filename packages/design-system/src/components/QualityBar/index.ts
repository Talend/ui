import { QualityBar as QualityBarComponent } from './QualityBar.component';
import { QualityType } from './QualityBar.types';
import { formatNumber, getQualityPercentagesRounded } from './QualityRatioBar.utils';

export type QualityBarType = typeof QualityBarComponent & {
	QualityType: typeof QualityType;
};

const QualityBar = QualityBarComponent as QualityBarType;
QualityBar.QualityType = QualityType;

export { QualityBar, QualityType, formatNumber, getQualityPercentagesRounded };
