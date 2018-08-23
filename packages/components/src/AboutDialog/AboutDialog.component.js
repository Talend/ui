import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import { Dialog, Icon } from '../';
import getDefaultT from '../translate';
import theme from './AboutDialog.scss';

import I18N_DOMAIN_COMPONENTS from '../constants';


export class AboutDialog extends React.Component {
	render() {
		const { services, expanded, show, version, copyright, onToggle, t } = this.props;
		const bar = {
			actions: {
				center: [
					{
						actionId: 'help:about:toggle',
						label: expanded ? t('LESS', { defaultValue: 'Less' }) : t('MORE', { defaultValue: 'More' }),
						bsStyle: 'default btn-inverse',
						onClick: onToggle,
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
				<Icon name="talend-tdp-colored" className={classNames(theme['about-logo'], 'about-logo')} />
				<div className={classNames(theme['about-excerpt'], 'about-excerpt')}>
					<div>{t('ABOUT_VERSION_NAME', { defaultValue: 'Version: {{version}}', version })}</div>
					<div>{copyright}</div>
				</div>
				{expanded && (
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
				)}
			</Dialog>
		);
	}
}


AboutDialog.displayName = 'AboutDialog';
AboutDialog.defaultProps = {
	t: getDefaultT(),
};

if (process.env.NODE_ENV !== 'production') {
	AboutDialog.propTypes = {
		expanded: PropTypes.bool,
		show: PropTypes.bool,
		onToggle: PropTypes.func,
		version: PropTypes.string,
		copyright: PropTypes.string,
		services: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
				version: PropTypes.string,
				build: PropTypes.string,
			}),
		),
		t: PropTypes.func.isRequired,
	};
}

export default translate(I18N_DOMAIN_COMPONENTS)(AboutDialog);
