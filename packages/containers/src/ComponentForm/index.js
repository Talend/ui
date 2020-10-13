import ComponentForm from './ComponentForm.component';
import sagas from './ComponentForm.sagas';
import * as ComponentFormSelectors from './ComponentForm.selectors';
import * as ComponentFormActions from './ComponentForm.actions';
import kit from './kit';

ComponentForm.sagas = sagas;
ComponentForm.selectors = ComponentFormSelectors;
ComponentForm.actions = ComponentFormActions;
ComponentForm.kit = kit;

export default ComponentForm;
