import { actionsCreators as actionsCreatorsSubHeader } from './subheaderbar.actions';
import { actionsCreators as actionsCreatorsEditableText } from './editabletext.actions';

export default {
	'http:get:photos1': () =>
		actions.http.get('https://jsonplaceholder.typicode.com/photos/', {
			cmf: {
				collectionId: 'photos1',
			},
		}),
	'http:get:photos2': () =>
		actions.http.get('https://jsonplaceholder.typicode.com/photos/', {
			cmf: {
				collectionId: 'photos2',
			},
		}),
	'object:view': (_, data) => ({ type: 'OBJECT_VIEW', ...data }),
	'cancel:hide:dialog': (_, data) => ({ type: 'HIDE_DIALOG', ...data }),
	'confirm:dialog': (_, data) => ({ type: 'CONFIRM_DIALOG', ...data }),
	'item1:action': (_, data) => ({ type: 'CHOOSE_ITEM1', ...data }),
	'item2:action': () => ({ type: 'CHOOSE_ITEM2' }),
	'tabbar:select': (_, data) => ({ type: 'SELECT_TAB', payload: { ...data } }),
	'subheaderbar:display-sharing': actionsCreatorsSubHeader.sharingSubHeader,
	'subheaderbar:display-bubbles': actionsCreatorsSubHeader.bubblesSubHeader,
	'subheaderbar:submit': actionsCreatorsSubHeader.submitSubheader,
	'subheaderbar:edit': actionsCreatorsSubHeader.editSubHeaderBar,
	'subheaderbar:cancel': actionsCreatorsSubHeader.cancelSubHeaderBar,
	'subheaderbar:change': actionsCreatorsSubHeader.changeSubHeaderBar,
	'subheaderbar:goback': actionsCreatorsSubHeader.goBackSubHeaderBar,
	'editabletext:submit': actionsCreatorsEditableText.submitEditableText,
	'editabletext:edit': actionsCreatorsEditableText.editEditableText,
	'editabletext:cancel': actionsCreatorsEditableText.cancelEditableText,
	'editabletext:change': actionsCreatorsEditableText.changeEditableText,
};
