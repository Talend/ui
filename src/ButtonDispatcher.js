import React from 'react';
import { Dispatcher } from 'react-cmf';
import ButtonAction from './ButtonAction';

const ButtonDispatcher = (props) => {
  const { action, children, ...rest } = props;
  return (<Dispatcher onClick={action}>
    <ButtonAction action={action} {...rest}>{children}</ButtonAction>
  </Dispatcher>);
};

ButtonDispatcher.propTypes = Object.assign({}, ButtonAction.propTypes);

export default ButtonDispatcher;
