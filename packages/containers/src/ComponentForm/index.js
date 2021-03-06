import ComponentForm from './ComponentForm.component';
import sagas, * as internalSagas from './ComponentForm.sagas';
import * as ComponentFormSelectors from './ComponentForm.selectors';
import * as ComponentFormActions from './ComponentForm.actions';
import kit from './kit';
import fields from './fields';
import withNameResolver from './fields/NameResolver';

ComponentForm.sagas = sagas;
ComponentForm.internalSagas = internalSagas;
ComponentForm.selectors = ComponentFormSelectors;
ComponentForm.actions = ComponentFormActions;
ComponentForm.kit = kit;
ComponentForm.fields = fields;
ComponentForm.withNameResolver = withNameResolver;

export default ComponentForm;
