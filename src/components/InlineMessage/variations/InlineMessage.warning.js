import React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import InlineMessage from '../InlineMessage';
import Icon from '../../Icon';

const StyledComponent = styled(InlineMessage)`
	color: ${(props) => props.theme.colors.warningColor};
	background: ${(props) => props.withBackground && tint(0.9, props.theme.colors.warningColor)};
`;

const InlineMessageWarning = React.forwardRef((props, ref) => {
	return <StyledComponent icon={<Icon name={'warning'} />} {...props} ref={ref} />;
});

InlineMessageWarning.propTypes = InlineMessage.propTypes;

export default React.memo(InlineMessageWarning);
