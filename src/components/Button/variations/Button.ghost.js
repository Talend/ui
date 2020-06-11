import styled from 'styled-components';
import { tint } from 'polished';
import ButtonBase from '../Button';

const ButtonGhost = styled(ButtonBase)`
	border: none;
	color: ${(props) => props.theme.colors.primaryColor};

	&:not([aria-disabled='true']):hover,
	&:not([aria-disabled='true']):focus {
		background: ${(props) => tint(0.9, props.theme.colors.primaryColor)};
	}

	&:not([aria-disabled='true']):active {
		background: ${(props) => tint(0.7, props.theme.colors.primaryColor)};
	}

	&[aria-disabled='true'] {
		background-color: ${(props) => props.theme.colors.transparent};
	}
`;

export default ButtonGhost;
