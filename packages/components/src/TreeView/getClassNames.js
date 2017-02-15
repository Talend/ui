import classNames from 'classnames';

const getClassName = theme => className => classNames(className, theme[className]);

export default getClassName;
