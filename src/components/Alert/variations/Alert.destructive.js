import React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import Alert from '../Alert';
import tokens from '../../../tokens';
import Icon from '../../Icon';

const StyledComponent = styled(Alert)`
	background: ${props => props.background && tint(0.9, tokens.colors.destructiveColor)};
`;

const AlertDestructive = React.forwardRef((props, ref) => {
	return (
		<StyledComponent
			icon={<Icon className={'text-red-500'} name={'cross'} />}
			{...props}
			ref={ref}
		/>
	);
});

AlertDestructive.propTypes = Alert.propTypes;

export default React.memo(AlertDestructive);
