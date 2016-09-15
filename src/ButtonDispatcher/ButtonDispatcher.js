import React from 'react';
import { Dispatcher } from 'react-cmf';
import ButtonAction from '../ButtonAction';

/**
 * @param	{object} props [description]
 * @example
<ButtonDispatcher action={action} />
 */
function ButtonDispatcher(props) {
	const { action, children, ...rest } = props;
	return (<Dispatcher onClick={action}>
		<ButtonAction action={action} {...rest}>{children}</ButtonAction>
	</Dispatcher>);
}

ButtonDispatcher.propTypes = Object.assign({}, ButtonAction.propTypes);

export default ButtonDispatcher;
