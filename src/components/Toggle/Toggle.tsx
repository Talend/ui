import React from 'react';
import styled from 'styled-components';
import Button from './../Button';
import { IconName } from '../Icon/Icon';

export type ToggleProps = {
	/** icon name to display */
	icon?: IconName;
	/** if the toggle is active or not */
	isActive?: boolean;
	/** if the button is disabled or not */
	disabled?: boolean;
	/** onChange handler */
	onChange?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const IconButton = styled(({ isActive, theme, ...rest }) => <Button.Icon {...rest} />)<{
	isActive: boolean;
}>(
	({ isActive, theme }) => `
	${
		isActive &&
		`
			color: ${theme.colors.buttonPrimaryColor};
			background-color: ${theme.colors.buttonPrimaryBackgroundColor};
			border-color: ${theme.colors.buttonPrimaryBackgroundColor};
				
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
		`
	}
`,
);

const Toggle: React.FC<ToggleProps> = React.forwardRef((props: ToggleProps, ref) => {
	const [isActive, toggle] = React.useState(props.isActive);

	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		toggle(prevState => !prevState);
		props.onChange && props.onChange(event);
	}

	return <IconButton {...props} isActive={isActive} onClick={handleClick} ref={ref} />;
});

export default Toggle;
