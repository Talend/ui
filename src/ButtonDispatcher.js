import { connect } from 'react-redux';
import { api } from 'react-ui-abstraction';
import ButtonAction from './ButtonAction';

const ButtonDispatcher = connect(
  undefined,
  api.action.mapDispatchToProps
)(ButtonAction);

export default ButtonDispatcher;
