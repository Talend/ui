import React from 'react';
import styled from 'styled-components';
import Button from './../Button';
import { ButtonProps } from './../Button/Button';
import { IconName } from '../Icon/Icon';

export type ToggleProps = ButtonProps & {
	/** if the toggle is active or not */
	isActive?: boolean;
	/** onChange handler */
	onChange?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const IconButton = styled(Button.Icon)(
	({ theme }) => `
		&.btn--is-active {
			color: ${theme.colors.buttonPrimaryColor};
			background-color: ${theme.colors.buttonPrimaryBackgroundColor};
			border: 1px solid ${theme.colors.buttonPrimaryBackgroundColor};
				
			&:hover,
			&:active {
				color: ${theme.colors.buttonPrimaryColor};
			}
					
			&:hover {
				background-color: ${theme.colors.buttonPrimaryHoverBackgroundColor};
				border-color: ${theme.colors.buttonPrimaryHoverBackgroundColor};
			}
				
			&:active {
				background-color: ${theme.colors.buttonPrimaryActiveBackgroundColor};
				border-color: ${theme.colors.buttonPrimaryActiveBackgroundColor};
			}
			
			&[aria-disabled='true'] {
				color: ${theme.colors.buttonDisabledColor};
				background-color: ${theme.colors.buttonDisabledBackgroundColor};
				border-color: ${theme.colors.buttonDisabledBackgroundColor};
			}
		}
`,
);

const Toggle: React.FC<ToggleProps> = React.forwardRef((props: ToggleProps, ref) => {
	const [isActive, toggle] = React.useState(props.isActive);

	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		toggle(!isActive);
		props.onChange && props.onChange(event);
	}

	return (
		<IconButton
			ref={ref}
			{...props}
			className={`btn--toggle ${props.className || ''} ${isActive ? 'btn--is-active' : ''}`}
			onClick={handleClick}
		/>
	);
});

export default Toggle;
