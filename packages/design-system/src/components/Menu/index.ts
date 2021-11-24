import Menu from './Menu';
import MenuItem from './MenuItem';
import ReversedMenu from './variations/Menu.Reversed';

const MenuComponent = Menu as typeof Menu & {
	Item: typeof MenuItem;
	Reversed: typeof ReversedMenu;
};

MenuComponent.Item = MenuItem;
MenuComponent.Reversed = ReversedMenu;

export default MenuComponent;
