import React from 'react';

import './grid.css';

const Grid = () => (
  <g>
    <defs>
      <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#BFBDBD" strokeWidth="0.5" />
      </pattern>
      <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
        <rect width="50" height="50" fill="url(#smallGrid)" />
        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#BFBDBD" strokeWidth="1" />
      </pattern>
    </defs>
    <rect
      style={{ pointerEvents: 'none' }}
      x="0" y="0" width="1000%" height="1000%" fill="url(#grid)"
    />
  </g>
);

export default Grid;
