import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { api } from 'react-ui-abstraction';

import Icon from './Icon';

export default class ButtonAction extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(event) {
    if (this.props.onClick) {
      this.props.onClick(event, this.props, this.context);
    }
  }
  render() {
    const btn = this.props.btn || 'default';
    let label = this.props.label;
    let action = this.props.action;
    let icon;
    if (action) {
      if (typeof action === 'string') {
        action = api.action.getActionInfo(this.context, action);
      }
      label = action.name;
      if (this.props.icon) {
        icon = action.icon;
      }
    }
    return (
      <Button bsStyle={btn} onClick={this.onClick}>
        {icon ? <Icon name={icon} className="fa fa-fw" /> : null}
        {this.props.hideLabel ? null : label}
      </Button>
    );
  }
}

ButtonAction.propTypes = Object.assign(
  {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.bool,
    onMouseLeave: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    btn: React.PropTypes.string,
  },
  {
    action: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object,
    ]),
    model: React.PropTypes.object,
    onClick: React.PropTypes.func,
    hideLabel: React.PropTypes.bool,
    icon: React.PropTypes.bool,
  }
);
ButtonAction.contextTypes = {
  router: React.PropTypes.object,
  store: React.PropTypes.object,
  registry: React.PropTypes.object,
};
