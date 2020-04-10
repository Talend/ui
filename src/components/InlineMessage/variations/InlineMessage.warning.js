import React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import InlineMessage from '../InlineMessage';
import tokens from '../../../tokens';
import Icon from '../../Icon';

const StyledComponent = styled(InlineMessage)`
	background: ${props => props.withBackground && tint(0.9, tokens.colors.warningColor)};
`;

const InlineMessageWarning = React.forwardRef((props, ref) => {
	return (
		<StyledComponent
			icon={<Icon className={'text-orange-500'} name={'warning'} />}
			{...props}
			ref={ref}
		/>
	);
});

InlineMessageWarning.propTypes = InlineMessage.propTypes;

export default React.memo(InlineMessageWarning);
