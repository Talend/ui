import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';

import Dialog from '../Dialog';
import Skeleton from '../Skeleton';
import Icon from '../Icon';
import getDefaultT from '../translate';
import theme from './AboutDialog.scss';

import I18N_DOMAIN_COMPONENTS from '../constants';
import { AboutDialogTable, Text } from './AboutDialogTable.component';

function AboutDialog({
	services,
	expanded,
	definition,
	show,
	product,
	version,
	loading,
	icon,
	copyrights,
	onToggle,
	onHide,
	t,
}) {
	const bar = {
		actions: {
			center: [
				{
					label: expanded
						? t('LESS', { defaultValue: 'Less' })
						: t('MORE', { defaultValue: 'More' }),
					className: 'btn-default btn-inverse',
					onClick: onToggle,
				},
			],
		},
	};

	return (
		<Dialog
			header={t('ABOUT_HEADER', { defaultValue: 'About {{product}}', product })}
			className={classNames(theme['about-dialog'], 'about-dialog')}
			type={Dialog.TYPES.INFORMATIVE}
			onHide={onHide}
			actionbar={bar}
			show={show}
		>
			<div>
				<Icon name={icon} className={classNames(theme['about-logo'], 'about-logo')} />
				<div className={classNames(theme['about-excerpt'], 'about-excerpt')}>
					<Text
						text={t('ABOUT_VERSION_NAME', {
							defaultValue: 'Version: {{version}}',
							version,
							interpolation: { escapeValue: false },
						})}
						size={Skeleton.SIZES.xlarge}
						loading={loading}
					/>
					<Text
						text={
							copyrights ||
							t('ABOUT_COPYRIGHTS', {
								defaultValue: '© {{year}} Talend. All Rights Reserved',
								year: new Date().getFullYear(),
							})
						}
						size={Skeleton.SIZES.large}
						loading={loading}
					/>
				</div>
				{expanded && (
					<AboutDialogTable t={t} loading={loading} services={services} definition={definition} />
				)}
			</div>
		</Dialog>
	);
}

AboutDialog.displayName = 'AboutDialog';
AboutDialog.defaultProps = {
	t: getDefaultT(),
};

if (process.env.NODE_ENV !== 'production') {
	AboutDialog.propTypes = {
		expanded: PropTypes.bool,
		show: PropTypes.bool,
		loading: PropTypes.bool,
		copyrights: PropTypes.string,
		onToggle: PropTypes.func,
		onHide: PropTypes.func,
		product: PropTypes.string,
		version: PropTypes.string,
		icon: PropTypes.string,
		t: PropTypes.func,
		...AboutDialogTable.propTypes,
	};

	AboutDialog.defaultProps = {
		expanded: false,
		show: false,
		loading: false,
		copyrights: '',
		version: '',
		icon: '',
		product: 'this product',
		t: getDefaultT(),
	};
}

export default withTranslation(I18N_DOMAIN_COMPONENTS)(AboutDialog);
