import React from 'react';
import styled from 'styled-components';
import { shade } from 'polished';
import Button from '../Button';
import Primary from './Button.primary';
import tokens from '../../../tokens';

const StyledComponent = styled(Primary)`
	background: ${tokens.colors.destructiveColor};

	&:not([disabled]):hover {
		background: ${shade(0.2, tokens.colors.destructiveColor)};
	}

	&:not([disabled]):active {
		background: ${shade(0.4, tokens.colors.destructiveColor)};
	}
`;

const ButtonDestructive = React.forwardRef((props, ref) => {
	return <StyledComponent {...props} ref={ref} />;
});

ButtonDestructive.propTypes = Button.propTypes;

export default React.memo(ButtonDestructive);
