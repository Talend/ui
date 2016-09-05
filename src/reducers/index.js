import { combineReducers } from 'redux';

import collectionsReducers from './collectionsReducers';
import componentsReducers from './componentsReducers';
import settingsReducers from './settingsReducers';


export default combineReducers({
  collections: collectionsReducers,
  components: componentsReducers,
  settings: settingsReducers,
});
