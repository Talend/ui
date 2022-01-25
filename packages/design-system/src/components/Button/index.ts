import Button from './Button';
import ButtonPrimary from './variations/Button.primary';
import ButtonSecondary from './variations/Button.secondary';
import ButtonDestructive from './variations/Button.destructive';
import ButtonTertiary from './variations/Button.tertiary';

const ButtonComponent = Button as typeof Button & {
	Primary: typeof ButtonPrimary;
	Destructive: typeof ButtonDestructive;
	Secondary: typeof ButtonSecondary;
	Tertiary: typeof ButtonTertiary;
};

ButtonComponent.Primary = ButtonPrimary;
ButtonComponent.Destructive = ButtonDestructive;
ButtonComponent.Secondary = ButtonSecondary;
ButtonComponent.Tertiary = ButtonTertiary;

export type ButtonComponentType =
	| typeof ButtonPrimary
	| typeof ButtonDestructive
	| typeof ButtonSecondary
	| typeof ButtonTertiary;

export default ButtonComponent;
