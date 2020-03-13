import styled, { css } from 'styled-components';
import { tint } from 'polished';
import colors from '../../../tokens/colors.tokens';
import Button from '../Button';

const ButtonSecondary = styled(Button)`
	color: ${colors.primaryColor};
	background: ${colors.white};

	&:not([disabled]):hover {
		background: ${tint(0.9, colors.primaryColor)};
	}

	&:not([disabled]):active {
		background: ${tint(0.7, colors.primaryColor)};
	}

	&[disabled],
	&[aria-disabled='true'] {
		border-color: ${colors.alto};
		background-color: ${colors.white};
	}
`;

export default ButtonSecondary;
