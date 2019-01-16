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

const FLAGS = {
	CERTIFIED: 'talend-badge',
	FAVORITE: 'talend-star',
};

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

function Resource({ parent, index, style, className, t }) {
	const rowData = getRowData(parent, index);
	if (!rowData) {
		return null;
	}

	let onRowClick;
	const { icon, name, author, modified, flags = [] } = rowData;

	if (parent.props.onRowClick) {
		onRowClick = event => parent.props.onRowClick({ event, rowData });
	}

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			className={classNames('resource-item', theme['resource-item'], className)}
			style={style}
			role="listitem"
			tabIndex="0"
			aria-posinset={index + 1}
			aria-setsize={parent.props.rowCount}
			aria-label={name}
			onClick={onRowClick}
		>
			{icon && <Icon name={icon} />}
			<div className={classNames('data-container', theme['data-container'])}>
				<span className={classNames('title', theme.title)}>{name}</span>
				<small className={classNames('author', theme.author)}>
					{getAuthorLabel(t, author, modified)}
				</small>
			</div>
			<div className={classNames('flags-container', theme['flags-container'])}>
				{Object.keys(FLAGS).map(flag => (
					<Icon
						className={classNames(theme.flag, {
							[theme.visible]: flags.includes(flag),
						})}
						name={FLAGS[flag]}
					/>
				))}
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
	className: PropTypes.string,
	parent: PropTypes.shape({
		props: PropTypes.shape({
			onRowClick: PropTypes.func,
			collection: PropTypes.arrayOf(
				PropTypes.shape({
					icon: PropTypes.string,
					name: PropTypes.string,
					author: PropTypes.string,
					modified: PropTypes.string,
					flags: PropTypes.arrayOf(PropTypes.string),
				}),
			),
		}),
	}),
};

export default translate(I18N_DOMAIN_COMPONENTS)(Resource);
