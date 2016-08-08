import React from 'react';
import Registry from './registry';

export default class RegistryProvider extends React.Component {

  getChildContext() {
    return { registry: Registry.getRegistry() };
  }

  render() {
    const childrenWithProps = React.Children.map(
      this.props.children,
       (child) => React.cloneElement(child, {
         onClick: this.onClick,
       })
    );
    const child = React.Children.only(childrenWithProps[0]);
    return (child);
  }
}

RegistryProvider.propTypes = {
  children: React.PropTypes.object,
};
RegistryProvider.childContextTypes = {
  registry: React.PropTypes.object,
};
