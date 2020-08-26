import * as S from './HeaderBar.style';

const HeaderBar = S.HeaderBar;

const HeaderBarComponent = HeaderBar as typeof HeaderBar & {
	Logo: typeof S.Logo;
	Brand: typeof S.Brand;
	MenuDisclosure: typeof S.MenuDisclosure;
	Menu: typeof S.Menu;
	Left: typeof S.Left;
	Right: typeof S.Right;
	Item: typeof S.Item;
	CTA: typeof S.CTA;
	Notifications: typeof S.Notifications;
	IPC: typeof S.IPC;
	Help: typeof S.Help;
	User: typeof S.User;
};

HeaderBarComponent.Logo = S.Logo;
HeaderBarComponent.Brand = S.Brand;
HeaderBarComponent.MenuDisclosure = S.MenuDisclosure;
HeaderBarComponent.Menu = S.Menu;
HeaderBarComponent.Left = S.Left;
HeaderBarComponent.Right = S.Right;
HeaderBarComponent.Item = S.Item;
HeaderBarComponent.CTA = S.CTA;
HeaderBarComponent.Notifications = S.Notifications;
HeaderBarComponent.IPC = S.IPC;
HeaderBarComponent.Help = S.Help;
HeaderBarComponent.User = S.User;

export default HeaderBarComponent;
