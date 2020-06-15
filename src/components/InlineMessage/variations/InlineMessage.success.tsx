import * as React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import InlineMessage, { InlineMessageProps } from '../InlineMessage';
import Icon from '../../Icon';

const StyledComponent = styled(InlineMessage)`
	color: ${({ theme }) => theme.colors.successColor};
	background: ${(props) => props.withBackground && tint(0.9, props.theme.colors.successColor)};
`;

const InlineMessageSuccess = React.forwardRef((props: InlineMessageProps, ref) => {
	return <StyledComponent icon={<Icon name={'check'} />} {...props} ref={ref} />;
});

export default React.memo(InlineMessageSuccess);
