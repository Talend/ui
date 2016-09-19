import { themr } from 'react-css-themr';
import { SIDE_MENU } from '../identifiers';
import SideMenu from './SideMenu.component';
import theme from './SideMenu.scss';

const ThemedSideMenu = themr(SIDE_MENU, theme)(SideMenu);

export default ThemedSideMenu;
