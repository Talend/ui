import { action } from '@storybook/addon-actions';

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
	'item1:action': (_, data) => ({ type: 'CHOOSE_ITEM1', ...data }),
	'item2:action': () => ({ type: 'CHOOSE_ITEM2' }),
	'list:view': (_, data) => ({ type: 'OBJECT_VIEW', ...data }),
	'breadcrumb:folder:openA': action('click on A'),
	'breadcrumb:folder:openB': action('click on B'),
	'breadcrumb:folder:openC': action('click on C'),
	'confirm-dialog:validate': (_, data) => ({ type: 'CONFIRM_DIALOG', ...data }),
	'confirm-dialog:cancel': (_, data) => ({ type: 'HIDE_DIALOG', ...data }),
	'tabbar:select': (_, data) => ({ type: 'SELECT_TAB', payload: { ...data } }),
	'subheaderbar:display-sharing': (_, data) => ({ type: 'OVERLAY_SHARING_SUBHEADER', ...data }),
	'subheaderbar:display-bubbles': (_, data) => ({ type: 'OVERLAY_BUBBLES_SUBHEADER', ...data }),
	'subheaderbar:submit': (_, data) => ({ type: 'SUBMIT_INPUT_SUBHEADERBAR', ...data }),
	'subheaderbar:edit': (_, data) => ({ type: 'EDIT_SUBHEADERBAR', ...data }),
	'subheaderbar:cancel': (_, data) => ({ type: 'CANCEL_SUBHEADER_BAR', ...data }),
	'subheaderbar:goback': (_, data) => ({ type: 'GO_BACK_SUBHEADER_BAR', ...data }),
	'subheaderbar:change': (_, data) => ({ type: 'CHANGE_SUBHEADER_BAR', ...data }),
	'editabletext:submit': (_, data) => ({ type: 'SUBMIT_EDITABLE_TEXT', ...data }),
	'editabletext:edit': (_, data) => ({ type: 'EDIT_EDITABLE_TEXT', ...data }),
	'editabletext:cancel': (_, data) => ({ type: 'CANCEL_EDITABLE_TEXT', ...data }),
	'editabletext:change': (_, data) => ({ type: 'CHANGE_EDITABLE_TEXT', ...data }),
};
