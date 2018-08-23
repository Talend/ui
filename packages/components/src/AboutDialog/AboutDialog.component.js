import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import { Dialog, Skeleton, Icon } from '../';
import getDefaultT from '../translate';
import theme from './AboutDialog.scss';

import I18N_DOMAIN_COMPONENTS from '../constants';

function Text({ text, loading }) {
	return (
		<div>
			{loading ? (
				<Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />
			) : (
				<span>{text}</span>
			)}
		</div>
	);
}

function Table({ services, t }) {
	if (!services || !services.length) {
		return null;
	}

	return (
		<table className={classNames(theme['about-versions'], 'about-versions')}>
			<thead>
				<tr>
					<th>{t('SERVICE', { defaultValue: 'Service' })}</th>
					<th>{t('BUILD_ID', { defaultValue: 'Build ID' })}</th>
					<th>{t('VERSION', { defaultValue: 'Version' })}</th>
				</tr>
			</thead>
			<tbody>
				{services.map(service => (
					<tr>
						<td>{service.name}</td>
						<td>{service.build}</td>
						<td>{service.version}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

class AboutDialog extends React.Component {
	render() {
		const { services, expanded, show, version, loading, icon, onToggle, t } = this.props;
		const bar = {
			actions: {
				center: [
					{
						label: expanded
							? t('LESS', { defaultValue: 'Less' })
							: t('MORE', { defaultValue: 'More' }),
						bsStyle: 'default btn-inverse',
						onClick: onToggle,
						loading,
					},
				],
			},
		};

		return (
			<Dialog
				header={t('ABOUT_MODAL_TITLE', { defaultValue: 'About my super product' })}
				type={Dialog.TYPES.INFORMATIVE}
				onHide={this.close}
				actionbar={bar}
				show={show}
			>
				<Icon name={icon} className={classNames(theme['about-logo'], 'about-logo')} />
				<div className={classNames(theme['about-excerpt'], 'about-excerpt')}>
					<Text
						text={t('ABOUT_VERSION_NAME', { defaultValue: 'Version: {{version}}', version })}
						loading={loading}
					/>
					<Text
						text={t('ABOUT_COPYRIGHT', { defaultValue: '© 2018 Talend. All Rights Reserved' })}
						loading={loading}
					/>
				</div>
				{expanded && <Table t={t} services={services} />}
			</Dialog>
		);
	}
}

AboutDialog.displayName = 'AboutDialog';
AboutDialog.defaultProps = {
	t: getDefaultT(),
};

if (process.env.NODE_ENV !== 'production') {
	Text.propTypes = {
		text: PropTypes.string,
		loading: PropTypes.bool,
	};

	Table.propTypes = {
		services: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
				version: PropTypes.string,
				build: PropTypes.string,
			}),
		),
		t: PropTypes.func.isRequired,
	};

	AboutDialog.propTypes = {
		expanded: PropTypes.bool,
		show: PropTypes.bool,
		loading: PropTypes.bool,
		onToggle: PropTypes.func,
		version: PropTypes.string,
		icon: PropTypes.string,
		t: PropTypes.func.isRequired,
		...Table.propTypes,
	};

	AboutDialog.defaultProps = {
		expanded: false,
		show: false,
		loading: false,
		version: '',
		icon: '',
		t: getDefaultT(),
	};
}

export default translate(I18N_DOMAIN_COMPONENTS)(AboutDialog);
