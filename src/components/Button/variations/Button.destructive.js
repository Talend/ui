import styled from 'styled-components';
import { shade } from 'polished';
import Primary from './Button.primary';
import tokens from '../../../tokens';

export default styled(Primary)`
	background: ${tokens.colors.destructiveColor};

	&:not([disabled]):hover {
		background: ${shade(0.2, tokens.colors.destructiveColor)};
	}

	&:not([disabled]):active {
		background: ${shade(0.4, tokens.colors.destructiveColor)};
	}
`;
