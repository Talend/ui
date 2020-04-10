import React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import InlineMessage from '../InlineMessage';
import tokens from '../../../tokens';
import Icon from '../../Icon';

const StyledComponent = styled(InlineMessage)`
	background: ${props => props.withBackground && tint(0.9, tokens.colors.informationColor)};
`;

const InlineMessageInformation = React.forwardRef((props, ref) => {
	return (
		<StyledComponent
			icon={<Icon className={'text-blue-500'} name={'information'} />}
			{...props}
			ref={ref}
		/>
	);
});

InlineMessageInformation.propTypes = InlineMessage.propTypes;

export default React.memo(InlineMessageInformation);
