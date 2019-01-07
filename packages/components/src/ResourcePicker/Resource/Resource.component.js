import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { distanceInWordsToNow } from 'date-fns';
import { translate } from 'react-i18next';
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
	return t(
		'RESOURCE_OWNED_BY',
		{ defaultValue: 'owned by {{ author }}, {{date}}', author, date: getDateLabel(t, date) }
	);
}

function Resource({ parent, index, style, t }) {
	const item = parent.props.collection[index];
	if (!item) {
		return null;
	}

	const { icon, name, author, modified } = parent.props.collection[index];
	return (
		<div className={classNames('resource-item', theme['resource-item'])} style={style}>
			{icon && <Icon name={icon} />}
			<div className={classNames('data-container', theme['data-container'])}>
				<h2>{name}</h2>
				<p>{getAuthorLabel(t, author, modified)}</p>
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
