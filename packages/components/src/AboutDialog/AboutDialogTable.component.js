import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import { Skeleton } from '../';
import theme from './AboutDialog.scss';

const maxHeight = 300;
const modalWidth = 586;
const serviceHeight = 30;

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
	t,
	definition = [
		{ key: 'name', label: t('SERVICE', { defaultValue: 'Service' }) },
		{ key: 'build', label: t('BUILD_ID', { defaultValue: 'Build ID' }) },
		{ key: 'version', label: t('VERSION', { defaultValue: 'Version' }) },
	],
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
