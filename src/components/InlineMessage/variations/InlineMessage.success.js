import React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import InlineMessage from '../InlineMessage';
import tokens from '../../../tokens';
import Icon from '../../Icon';

const StyledComponent = styled(InlineMessage)`
	background: ${props => props.withBackground && tint(0.9, tokens.colors.successColor)};
`;

const InlineMessageSuccess = React.forwardRef((props, ref) => {
	return (
		<StyledComponent
			icon={<Icon className={'text-green-500'} name={'check'} />}
			{...props}
			ref={ref}
		/>
	);
});

InlineMessageSuccess.propTypes = InlineMessage.propTypes;

export default React.memo(InlineMessageSuccess);
