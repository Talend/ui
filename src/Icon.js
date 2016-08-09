import React from 'react';
import classNames from 'classnames';

const Icon = (props) => {
  const iconClasses = classNames(
    'fa',
    props.className,
    props.name
  );
  return (
    <i className={iconClasses}></i>
  );
};

Icon.propTypes = {
  name: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
};

export default Icon;
