import ButtonPrimary from './variations/ButtonPrimary';
import ButtonSecondary from './variations/ButtonSecondary';
import ButtonTertiary from './variations/ButtonTertiary';
import ButtonDestructive from './variations/ButtonDestructive';
import Button from './Button';

import { BaseButtonProps } from './Primitive/ButtonPrimitive';

export type ButtonComponentTypes =
	| typeof ButtonPrimary
	| typeof ButtonSecondary
	| typeof ButtonTertiary
	| typeof ButtonDestructive;

export type SharedButtonComponentProps = Omit<BaseButtonProps, 'className'>;

export { Button, ButtonPrimary, ButtonSecondary, ButtonTertiary, ButtonDestructive };
