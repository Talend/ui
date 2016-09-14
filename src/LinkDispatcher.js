import React from 'react';
import { Dispatcher } from 'react-cmf';

import LinkAction from './LinkAction';

const LinkDispatcher = (props) => {
  const { action, children, ...rest } = props;
  return (<Dispatcher onClick={action}>
    <LinkAction action={action} {...rest}>{children}</LinkAction>
  </Dispatcher>);
};

LinkDispatcher.propTypes = Object.assign({}, LinkAction.propTypes);

export default LinkDispatcher;
