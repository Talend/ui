import { withTranslation } from 'react-i18next';
import MonthYearView from './MonthYearView.component';
import I18N_DOMAIN_COMPONENTS from '../../../../constants';

/** @type Function */
const MonthYearViewWithTranslationLegacy = withTranslation(I18N_DOMAIN_COMPONENTS)(MonthYearView);
export default MonthYearViewWithTranslationLegacy;
