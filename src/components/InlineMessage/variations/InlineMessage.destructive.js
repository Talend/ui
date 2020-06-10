import React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import InlineMessage from '../InlineMessage';
import Icon from '../../Icon';

const StyledComponent = styled(InlineMessage)`
	color: ${(props) => props.theme.colors.destructiveColor};
	background: ${(props) => props.withBackground && tint(0.9, props.theme.colors.destructiveColor)};
`;

const InlineMessageDestructive = React.forwardRef((props, ref) => {
	return <StyledComponent icon={<Icon name={'cross'} />} {...props} ref={ref} />;
});

InlineMessageDestructive.propTypes = InlineMessage.propTypes;

export default React.memo(InlineMessageDestructive);
