import Button from './Button';
import ButtonPrimary from './variations/Button.primary';
import ButtonSecondary from './variations/Button.secondary';
import ButtonDestructive from './variations/Button.destructive';
import ButtonGhost from './variations/Button.ghost';
import ButtonIcon from './variations/Button.icon';

const ButtonComponent = Button as typeof Button & {
	Primary: typeof ButtonPrimary;
	Destructive: typeof ButtonDestructive;
	Secondary: typeof ButtonSecondary;
	Ghost: typeof ButtonGhost;
	Icon: typeof ButtonIcon;
};

ButtonComponent.Primary = ButtonPrimary;
ButtonComponent.Destructive = ButtonDestructive;
ButtonComponent.Secondary = ButtonSecondary;
ButtonComponent.Ghost = ButtonGhost;
ButtonComponent.Icon = ButtonIcon;

export default ButtonComponent;
