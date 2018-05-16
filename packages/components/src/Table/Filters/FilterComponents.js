import StringFilterComponent from './StringFilterComponent';
import ToggleFilterComponent from './ToggleFilterComponent';

export const STRING_FILTER = 'string-filter';
export const TOGGLE_FILTER = 'toggle-filter';

export function getFilterComponent(filterClass) {
  switch (filterClass) {
    case STRING_FILTER:
      return StringFilterComponent;
    case TOGGLE_FILTER:
      return ToggleFilterComponent;
    default:
      return null;
  }
}

const defaultFilterComponents = {
  classes: {
    string: STRING_FILTER,
    toggle: TOGGLE_FILTER,
  },
  getFilterComponent,
};

export default defaultFilterComponents;
