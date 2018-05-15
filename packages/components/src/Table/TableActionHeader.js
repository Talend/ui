import React from 'react';
import PropTypes from 'prop-types';
import { ActionButton } from '../index';

const LEFT = 'left';
const RIGHT = 'right';

function getLabel(data, extra) {
  if (extra && extra.label) {
    return extra.label;
  }
  return data;
}

function getIcon(extra) {
  if (extra && extra.icon) {
    return extra.icon;
  }
  return null;
}

function getIconPosition(extra) {
  if (extra && extra.iconPosition) {
    return extra.iconPosition;
  }
  return LEFT;
}

function getOnClick(extra) {
  if (extra && extra.onClick) {
    return extra.onClick;
  }
  return null;
}

/**
 * This component displays a header of a table column as an ActionButton.
 * The action props { label } can be provided by data or by extra.label.
 * The action props { icon, onClick } are provided by extra props.
 *
 */
export default function TableActionHeader({ data, className, extra }) {
	return (
    <ActionButton
      className={`tc-table-action-header ${className}`}
      label={getLabel(data, extra)}
      icon={getIcon(extra)}
      onClick={getOnClick(extra)}
      iconPosition={getIconPosition(extra)}
    />
  );
}

TableActionHeader.propTypes = {
	data: PropTypes.string,
	className: PropTypes.string,
  extra: PropTypes.shape({
    label: PropTypes.string.isRequired,
		icon: PropTypes.object,
    iconPosition: PropTypes.oneOf([LEFT, RIGHT]),
		onClick: PropTypes.func,
	}),
};
