import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { distanceInWordsToNow } from 'date-fns';
import { translate } from 'react-i18next';
import { getRowData } from '../../VirtualizedList/utils/gridrow';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import getDefaultT from '../../translate';
import getLocale from '../../DateFnsLocale/locale';
import Icon from '../../Icon';

import theme from './Resource.scss';

function getDateLabel(t, date) {
	return distanceInWordsToNow(date, {
		addSuffix: true,
		locale: getLocale(t),
	});
}

function getAuthorLabel(t, author, date) {
	return t('RESOURCE_OWNED_BY', {
		defaultValue: 'owned by {{ author }}, {{date}}',
		author,
		date: getDateLabel(t, date),
	});
}

function Resource({ parent, index, style, t }) {
	const item = getRowData(parent, index);
	if (!item) {
		return null;
	}

	const { icon, name, author, modified } = item;
	return (
		<div
			className={classNames('resource-item', theme['resource-item'])}
			style={style}
			role="listitem"
			tabIndex="0"
			aria-posinset={index + 1}
			aria-setsize={parent.props.rowCount}
			aria-label={name}
		>
			{icon && <Icon name={icon} />}
			<div className={classNames('data-container', theme['data-container'])}>
				<span className={classNames('title', theme.title)}>{name}</span>
				<small className={classNames('author', theme.author)}>{getAuthorLabel(t, author, modified)}</small>
			</div>
		</div>
	);
}

Resource.defaultProps = {
	t: getDefaultT(),
};

Resource.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	t: PropTypes.func,
	parent: PropTypes.shape({
		props: PropTypes.shape({
			collection: PropTypes.arrayOf(
				PropTypes.shape({
					icon: PropTypes.string,
					name: PropTypes.string,
					author: PropTypes.string,
					modified: PropTypes.string,
				}),
			),
		}),
	}),
};

export default translate(I18N_DOMAIN_COMPONENTS)(Resource);
