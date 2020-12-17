import React from 'react';
import { ButtonProps } from '../Button/Button';
import * as S from './Toggle.style';

export type ToggleProps = ButtonProps & {
	/** if the toggle is active or not */
	isActive?: boolean;
	/** onChange handler */
	onChange?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Toggle: React.FC<ToggleProps> = React.forwardRef((props: ToggleProps, ref) => {
	const [isActive, toggle] = React.useState(props.isActive);

	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		toggle(!isActive);
		if (props.onChange) {
			props.onChange(event);
		}
	}

	return (
		<S.IconButton
			ref={ref}
			{...props}
			className={`btn--toggle ${props.className || ''} ${isActive ? 'btn--is-active' : ''}`}
			onClick={handleClick}
			aria-pressed={!!isActive}
		/>
	);
});

export default Toggle;
