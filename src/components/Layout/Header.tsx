import * as S from './Header.style';

const Header = S.Header;

const HeaderComponent = Header as typeof Header & {
	Logo: typeof S.Logo;
	LogoFull: typeof S.LogoFull;
	Brand: typeof S.Brand;
	Item: typeof S.Item;
	CTA: typeof S.CTA;
	Notification: typeof S.Notification;
	IPC: typeof S.IPC;
	Help: typeof S.Help;
	User: typeof S.User;
};

HeaderComponent.Logo = S.Logo;
HeaderComponent.LogoFull = S.LogoFull;
HeaderComponent.Brand = S.Brand;
HeaderComponent.Item = S.Item;
HeaderComponent.CTA = S.CTA;
HeaderComponent.Notification = S.Notification;
HeaderComponent.IPC = S.IPC;
HeaderComponent.Help = S.Help;
HeaderComponent.User = S.User;

export default HeaderComponent;
