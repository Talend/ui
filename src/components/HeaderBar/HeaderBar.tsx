import * as S from './HeaderBar.style';

const HeaderBar = S.HeaderBar;

const HeaderBarComponent = HeaderBar as typeof HeaderBar & {
	Fixed: typeof S.Fixed;
	Left: typeof S.Left;
	Right: typeof S.Right;
	Logo: typeof S.Logo;
	LogoFull: typeof S.LogoFull;
	Brand: typeof S.Brand;
	Menu: typeof S.Menu;
	Item: typeof S.Item;
	CTA: typeof S.CTA;
	Notification: typeof S.Notification;
	IPC: typeof S.IPC;
	Help: typeof S.Help;
	User: typeof S.User;
};

HeaderBarComponent.Fixed = S.Fixed;
HeaderBarComponent.Left = S.Left;
HeaderBarComponent.Right = S.Right;
HeaderBarComponent.Logo = S.Logo;
HeaderBarComponent.LogoFull = S.LogoFull;
HeaderBarComponent.Brand = S.Brand;
HeaderBarComponent.Menu = S.Menu;
HeaderBarComponent.Item = S.Item;
HeaderBarComponent.CTA = S.CTA;
HeaderBarComponent.Notification = S.Notification;
HeaderBarComponent.IPC = S.IPC;
HeaderBarComponent.Help = S.Help;
HeaderBarComponent.User = S.User;

export default HeaderBarComponent;
