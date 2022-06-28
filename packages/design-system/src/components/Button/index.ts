import ButtonPrimary from './variations/ButtonPrimary';
import ButtonSecondary from './variations/ButtonSecondary';
import ButtonTertiary from './variations/ButtonTertiary';
import ButtonDestructive from './variations/ButtonDestructive';
import Button from './Button';

import { AvailableSizes, BaseButtonProps } from './Primitive/ButtonPrimitive';

export type ButtonComponentTypes =
	| typeof ButtonPrimary
	| typeof ButtonSecondary
	| typeof ButtonTertiary
	| typeof ButtonDestructive;

export type SharedButtonComponentProps = Omit<BaseButtonProps<AvailableSizes>, 'className'>;

export { Button, ButtonPrimary, ButtonSecondary, ButtonTertiary, ButtonDestructive };
