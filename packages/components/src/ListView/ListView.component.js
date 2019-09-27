import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../constants';
import getDefaultT from '../translate';
import Header from './Header/Header.component';
import HeaderInput from './Header/HeaderInput.component';
import Items from './Items/Items.component';
import theme from './ListView.scss';

export const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
export const DISPLAY_MODE_SEARCH = 'DISPLAY_MODE_SEARCH';

function listviewClasses() {
	return classNames(theme['tc-listview'], 'tc-listview');
}

function ListView(props) {
	const noResultLabel = props.t('NO_RESULT_FOUND', { defaultValue: 'No result found.' });
	const emptyLabel = props.t('LISTVIEW_EMPTY', { defaultValue: 'This list is empty.' });
	const label = props.displayMode === DISPLAY_MODE_SEARCH ? noResultLabel : emptyLabel;
	return (
		<div className={listviewClasses()}>
			<HeaderListView {...props} />
			{props.items && props.items.length ? (
				<ItemsListView {...props} />
			) : (
				<span className={theme['empty-message']}>{label}</span>
			)}
		</div>
	);
}

ListView.displayName = 'ListView';

ListView.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object),
	t: PropTypes.func,
};

ListView.defaultProps = {
	items: [],
	isSwitchBox: false,
};

function ItemsListView(props) {
	return <Items {...props} />;
}

ItemsListView.propTypes = {
	getItemHeight: PropTypes.func,
	id: PropTypes.string,
	items: ListView.propTypes.items,
	isSwitchBox: PropTypes.bool,
	onToggleAll: PropTypes.func,
	searchCriteria: PropTypes.string,
	toggleAllChecked: PropTypes.bool,
	showToggleAll: PropTypes.bool,
	t: PropTypes.func,
};

function HeaderListView(props) {
	const {
		displayMode,
		onInputChange,
		onAddKeyDown,
		headerInput,
		headerDefault,
		headerLabel,
		items,
		required,
		searchPlaceholder,
		t,
	} = props;

	switch (displayMode) {
		case DISPLAY_MODE_SEARCH: {
			const propsInput = {
				headerInput,
				onInputChange,
				onAddKeyDown,
				inputPlaceholder: searchPlaceholder,
				t,
			};
			return <HeaderInput {...propsInput} />;
		}
		default: {
			const propsDefault = {
				headerDefault,
				headerLabel,
				required,
				nbItems: items.length,
				nbItemsSelected: items.filter(item => !!item.checked).length,
				t,
			};
			return <Header {...propsDefault} />;
		}
	}
}

HeaderListView.defaultProps = {
	displayMode: DISPLAY_MODE_DEFAULT,
	t: getDefaultT(),
};

HeaderListView.propTypes = {
	displayMode: PropTypes.string,
	headerDefault: PropTypes.arrayOf(PropTypes.object),
	headerInput: PropTypes.arrayOf(PropTypes.object),
	headerLabel: PropTypes.string,
	items: ListView.propTypes.items,
	onInputChange: PropTypes.func,
	onAddKeyDown: PropTypes.func,
	required: PropTypes.bool,
	searchPlaceholder: PropTypes.string,
	t: PropTypes.func,
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(ListView);
