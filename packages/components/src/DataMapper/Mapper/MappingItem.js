import React from 'react';

function display(item) {
  return '[ ' + item.source + ' => ' + item.target + ' ]'
}

export default function MappingItem({mappingItem}) {
  return (
    <div id='mappingItem'>{display(mappingItem)}</div>
  )
}
