import { themr } from 'react-css-themr';
import { BREADCRUMBS } from '../identifiers';
import Breadcrumbs from './Breadcrumbs.component';
import theme from './Breadcrumbs.scss';

const ThemedBreadcrumbs = themr(BREADCRUMBS, theme)(Breadcrumbs);
export default ThemedBreadcrumbs;
