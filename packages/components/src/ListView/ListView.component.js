import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../constants';
import Header from './Header/Header.component';
import HeaderInput from './Header/HeaderInput.component';
import Items from './Items/Items.component';
import theme from './ListView.scss';

const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
const DISPLAY_MODE_SEARCH = 'DISPLAY_MODE_SEARCH';

function listviewClasses() {
	return classNames(theme['tc-listview'], 'tc-listview');
}

function ListView(props) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const noResultLabel = t('NO_RESULT_FOUND', { defaultValue: 'No result found.' });
	const emptyLabel = t('LISTVIEW_EMPTY', { defaultValue: 'This list is empty.' });
	const label = props.displayMode === DISPLAY_MODE_SEARCH ? noResultLabel : emptyLabel;
	return (
		<div className={listviewClasses()}>
			<HeaderListView {...props} />
			{props.items.length ? (
				<Items {...props} />
			) : (
				<span className={theme['empty-message']}>{label}</span>
			)}
		</div>
	);
}

ListView.DISPLAY_MODES = { DISPLAY_MODE_DEFAULT, DISPLAY_MODE_SEARCH };

ListView.displayName = 'ListView';

ListView.propTypes = {
	displayMode: PropTypes.oneOf(Object.values(ListView.DISPLAY_MODES)),
	items: PropTypes.arrayOf(PropTypes.object),
};

ListView.defaultProps = {
	items: [],
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
	} = props;

	switch (displayMode) {
		case DISPLAY_MODE_SEARCH: {
			const propsInput = {
				headerInput,
				onInputChange,
				onAddKeyDown,
				inputPlaceholder: searchPlaceholder,
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
			};
			return <Header {...propsDefault} />;
		}
	}
}

HeaderListView.defaultProps = {
	displayMode: DISPLAY_MODE_DEFAULT,
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
};

export default ListView;
