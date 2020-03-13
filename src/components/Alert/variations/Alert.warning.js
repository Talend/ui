import React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import Alert from '../Alert';
import tokens from '../../../tokens';
import Icon from '../../Icon';

const StyledComponent = styled(Alert)`
	background: ${tint(0.9, tokens.colors.warningColor)};
`;

const AlertWarning = React.forwardRef((props, ref) => {
	return (
		<StyledComponent
			icon={<Icon className={'text-yellow-900'} name={'warning'} />}
			{...props}
			ref={ref}
		/>
	);
});

AlertWarning.propTypes = Alert.propTypes;

export default React.memo(AlertWarning);
