import React from 'react';
import PropTypes from 'prop-types';

export default function SchemaName({ dataAccessor, schema, side }) {
  return (
    <div
      className={`schema-name ${side}`}
    >
      {dataAccessor.getSchemaName(schema)}
    </div>
  );
}

SchemaName.propTypes = {
	dataAccessor: PropTypes.object,
  schema: PropTypes.object,
  side: PropTypes.string,
};
