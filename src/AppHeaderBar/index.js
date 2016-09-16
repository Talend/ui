import { themr } from 'react-css-themr';
import { APP_HEADER_BAR } from '../identifiers';
import AppHeaderBar from './AppHeaderBar.component';
import theme from './AppHeaderBar.scss';

const ThemedAppHeaderBar = themr(APP_HEADER_BAR, theme)(AppHeaderBar);

export default ThemedAppHeaderBar;
export { ThemedAppHeaderBar as AppHeaderBar };
