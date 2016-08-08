import React from 'react';
import { api } from 'react-ui-abstraction';

import ButtonDispatcher from './ButtonDispatcher';

export default class ButtonsDispatcher extends React.Component {

  render() {
    const actions = api.action.getContentTypeActions(
      this.context,
      this.props.contentType,
      this.props.category
    );
    const props = {
      icon: this.props.icon,
      hideLabel: this.props.hideLabel,
      btn: this.props.btn,
    };
    return (
      <div>
        {actions.map((action, i) => (
          <ButtonDispatcher
            action={action}
            key={i}
            {...props}
          />
        ))}
      </div>
    );
  }
}
const propTypes = Object.assign({}, ButtonDispatcher.propTypes);
delete propTypes.action;
delete propTypes.model;
delete propTypes.onClick;

ButtonsDispatcher.propTypes = Object.assign(
  propTypes,
  {
    contentType: React.PropTypes.string.isRequired,
    category: React.PropTypes.string.isRequired,
    icon: React.PropTypes.bool,
    hideLabel: React.PropTypes.bool,
    btn: React.PropTypes.string,
  }
);

ButtonsDispatcher.contextTypes = {
  store: React.PropTypes.object,
};
