import { connect } from 'react-redux';
import { api } from 'react-ui-abstraction';

import LinkAction from './LinkAction';

const LinkDispatcher = connect(
  undefined,
  api.action.mapDispatchToProps
)(LinkAction);

export default LinkDispatcher;
