import styled, { css } from 'styled-components';
import { shade } from 'polished';
import colors from '../../../tokens/colors.tokens';
import Button from '../Button';

const ButtonPrimary = styled(Button)`
	color: ${colors.white};
	background: ${colors.primaryColor};
	border-color: none;

	&:not([disabled]):hover {
		background: ${shade(0.2, colors.primaryColor)};
	}

	&:not([disabled]):active {
		background: ${shade(0.4, colors.primaryColor)};
	}

	&[disabled],
	&[aria-disabled='true'] {
		background-color: ${colors.alto};
	}
`;

export default ButtonPrimary;
