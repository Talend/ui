import { withTranslation } from 'react-i18next';
import DateView from './DateView.component';
import I18N_DOMAIN_COMPONENTS from '../../../constants';

/** @type Function */
const DateViewWithTranslation = withTranslation(I18N_DOMAIN_COMPONENTS)(DateView);
export default DateViewWithTranslation;
