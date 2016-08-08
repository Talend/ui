import React from 'react';
import { connect } from 'react-redux';
import { api } from 'react-ui-abstraction';

class Dispatcher extends React.Component {

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
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       onClick: this.onClick,
     })
    );
    const child = React.Children.only(childrenWithProps[0]);
    return (child);
  }
}
Dispatcher.propTypes = {
  action: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  model: React.PropTypes.object,
  onClick: React.PropTypes.func,
  children: React.PropTypes.object,
};

Dispatcher.contextTypes = {
  store: React.PropTypes.object,
};

export default connect(
  undefined,
  api.action.mapDispatchToProps
)(Dispatcher);
