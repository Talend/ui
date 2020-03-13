import styled, { css } from 'styled-components';
import { tint } from 'polished';
import colors from '../../../tokens/colors.tokens';
import Button from '../Button';

export default styled(Button)`
	border: none;
	color: ${colors.primaryColor};

	&:not([disabled]):hover,
	&:not([disabled]):focus {
		background: ${tint(0.9, colors.primaryColor)};
	}

	&:not([disabled]):active {
		background: ${tint(0.7, colors.primaryColor)};
	}

	&[disabled],
	&[aria-disabled='true'] {
		background-color: ${colors.transparent};
	}
`;
