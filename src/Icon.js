import React from 'react';
import classNames from 'classnames';

export default class Icon extends React.Component {

  render() {
    const iconClasses = classNames(
      'fa',
      this.props.className,
      this.props.name
    );
    return (
      <i className={iconClasses}></i>
    );
  }
}

Icon.propTypes = {
  name: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
};
