import { withTranslation } from 'react-i18next';
import DateTimeView from './DateTimeView.component';
import I18N_DOMAIN_COMPONENTS from '../../../../constants';

/** @type Function */
const DateTimeViewWithTranslation = withTranslation(I18N_DOMAIN_COMPONENTS)(DateTimeView);
export default DateTimeViewWithTranslation;
