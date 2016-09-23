import { themr } from 'react-css-themr';
import { SIDE_PANEL } from '../identifiers';
import SidePanel from './SidePanel.component';
import theme from './SidePanel.scss';

const ThemedSidePanel = themr(SIDE_PANEL, theme)(SidePanel);

export default ThemedSidePanel;
