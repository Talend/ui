import React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import InlineMessage from '../InlineMessage';
import Icon from '../../Icon';

const StyledComponent = styled(InlineMessage)`
	color: ${props =>
		!props.withBackground && props.theme.colors.inverseColor
			? props.theme.colors.inverseColor
			: props.theme.colors.mainColor};
	background: ${props => props.withBackground && tint(0.9, props.theme.colors.destructiveColor)};
`;

const InlineMessageDestructive = React.forwardRef((props, ref) => {
	return (
		<StyledComponent
			icon={<Icon className={'text-red-500'} name={'cross'} />}
			{...props}
			ref={ref}
		/>
	);
});

InlineMessageDestructive.propTypes = InlineMessage.propTypes;

export default React.memo(InlineMessageDestructive);
