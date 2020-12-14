import Button from './Button';
import ButtonPrimary from './variations/Button.primary';
import ButtonSecondary from './variations/Button.secondary';
import ButtonDestructive from './variations/Button.destructive';
import ButtonTertiary from './variations/Button.tertiary';
import ButtonIcon from './variations/Button.icon';

const ButtonComponent = Button as typeof Button & {
	Primary: typeof ButtonPrimary;
	Destructive: typeof ButtonDestructive;
	Secondary: typeof ButtonSecondary;
	Tertiary: typeof ButtonTertiary;
	Icon: typeof ButtonIcon;
};

ButtonComponent.Primary = ButtonPrimary;
ButtonComponent.Destructive = ButtonDestructive;
ButtonComponent.Secondary = ButtonSecondary;
ButtonComponent.Tertiary = ButtonTertiary;
ButtonComponent.Icon = ButtonIcon;

export default ButtonComponent;
