import React from 'react';
import * as S from './Toggle.style';
import { ButtonIconProps } from '../Button/variations/Button.icon';

export type ToggleProps = ButtonIconProps & {
	/** if the toggle is active or not */
	isActive?: boolean;
	/** onChange handler */
	onChange?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Toggle: React.FC<ToggleProps> = React.forwardRef((props: ToggleProps, ref) => {
	const [isActive, toggle] = React.useState(props.isActive);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		toggle(!isActive);
		if (props.onChange) {
			props.onChange(event);
		}
	};

	return (
		<S.Toggle
			ref={ref}
			{...props}
			className={`btn--toggle ${props.className || ''} ${isActive ? 'btn--is-active' : ''}`}
			onClick={handleClick}
			aria-pressed={!!isActive}
		/>
	);
});

export default Toggle;
