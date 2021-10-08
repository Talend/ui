import HeaderBar from './HeaderBar.connect';
import HeaderBarSagas from './HeaderBar.sagas';
import * as HeaderBarConstants from './HeaderBar.constant';
import * as HeaderBarActions from './HeaderBar.actions';

HeaderBar.sagas = HeaderBarSagas;
HeaderBar.constant = HeaderBarConstants;
HeaderBar.actions = HeaderBarActions;

export default HeaderBar;
