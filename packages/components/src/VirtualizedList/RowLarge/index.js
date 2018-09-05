import React from 'react';
import RowLarge from './RowLarge.component';
import { listTypes } from '../utils/constants';

export const rowType = listTypes.LARGE;
export default props => <RowLarge {...props} />;
