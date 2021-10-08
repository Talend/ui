import List from './List.connect';
import ListSaga from './List.sagas';
import * as ListConstants from './List.constant';
import * as ListSelectors from './selector';

List.sagas = ListSaga;
List.constants = ListConstants;
List.selectors = ListSelectors;

export default List;
