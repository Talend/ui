import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import { getI18nInstance } from '../translate';
import Skeleton from '../Skeleton';

import theme from './AboutDialog.scss';

const maxHeight = 300;
const modalWidth = 571;
const serviceHeight = 30;

const i18n = getI18nInstance();

const getColumnHeaders = () => ({
	NAME: { key: 'name', label: i18n.t('tui-components:SERVICE', { defaultValue: 'Service' }) },
	BUILD: { key: 'build', label: i18n.t('tui-components:BUILD_ID', { defaultValue: 'Build ID' }) },
	VERSION: { key: 'version', label: i18n.t('tui-components:VERSION', { defaultValue: 'Version' }) },
});

export function Text({ text, loading, size = Skeleton.SIZES.medium }) {
	return <div>{loading ? <Skeleton type={Skeleton.TYPES.text} size={size} /> : text}</div>;
}

/**
 * This function set the column width that rely on the number of column displayed
 * @param {array} definition
 */
function getColumnWidth(definition) {
	return { minWidth: modalWidth / definition.length };
}

/**
 * This function set the max height of the table in order to not have a blank space when
 * the list of services is short
 * @param {array} services
 */
function getTbodyStyle(services) {
	return {
		height: Math.min(maxHeight, services.length * serviceHeight),
	};
}

export function AboutDialogTable({
	definition = Object.values(getColumnHeaders()),
	services = [],
	loading = false,
}) {
	if (!services || !services.length) {
		return null;
	}

	return (
		<table className={classNames(theme['about-versions'], 'about-versions', 'table table-striped')}>
			<thead>
				<tr>
					{definition.map(attribute => (
						<th style={getColumnWidth(definition)}>{attribute.label}</th>
					))}
				</tr>
			</thead>
			<tbody style={getTbodyStyle(services)}>
				{(loading
					? [{ name: 'loading-first' }, { name: 'loading-second' }, { name: 'loading-third' }]
					: services
				).map(service => (
					<tr key={service.name}>
						{definition.map(attribute => (
							<td style={getColumnWidth(definition)}>
								<Text loading={loading} text={service[attribute.key]} />
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

Text.propTypes = {
	text: PropTypes.string,
	loading: PropTypes.bool,
	size: PropTypes.string,
};

AboutDialogTable.propTypes = {
	services: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			version: PropTypes.string,
			build: PropTypes.string,
		}),
	),
	definition: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
			label: PropTypes.string,
		}),
	),
	loading: PropTypes.bool,
	t: PropTypes.func.isRequired,
};
