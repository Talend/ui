import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function MandatoryField({ element, dataKey, rowDataGetter, classNameProvider }) {
  const data = rowDataGetter.getData(element, dataKey);
  const label = data[0];
  const mandatory = data[1];
  return (
    <div
      className={`comp-list-row-data mandatory-field ${classnames(classNameProvider.get(element, dataKey))}`}
    >
      <div
        className="mandatory-field-label"
      >
        {label}
      </div>
      <div
        className="mandatory-field-info"
      >
        {mandatory ? '*' : ''}
      </div>
    </div>
  );
}

MandatoryField.propTypes = {
	element: PropTypes.object,
  dataKey: PropTypes.string,
	classNameProvider: PropTypes.func,
  rowDataGetter: PropTypes.func,
};
