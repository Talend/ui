import PropTypes from 'prop-types';

import Skeleton from '../../Skeleton';
import { getTheme } from '../../theme';
import TooltipTrigger from '../../TooltipTrigger';

import titleSubHeaderCssModule from './TitleSubHeader.module.scss';

const theme = getTheme(titleSubHeaderCssModule);

function DefaultSubTitle({ subTitle, subTitleProps }) {
	return (
		<TooltipTrigger label={subTitle} tooltipPlacement="bottom">
			<small className={theme('tc-subheader-details-text-subtitle')} {...subTitleProps}>
				{subTitle}
			</small>
		</TooltipTrigger>
	);
}

DefaultSubTitle.propTypes = {
	subTitle: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
	subTitleProps: PropTypes.object,
};

export function SubTitle({
	subTitleLoading,
	subTitle,
	subTitleAs: SubTitleAs = DefaultSubTitle,
	...rest
}) {
	if (subTitleLoading) {
		return (
			<Skeleton
				className={theme('tc-subheader-details-loading-subtitle')}
				type={Skeleton.TYPES.text}
				size={Skeleton.SIZES.large}
			/>
		);
	}

	if (subTitle) {
		return <SubTitleAs subTitle={subTitle} {...rest} />;
	}

	return null;
}

SubTitle.propTypes = {
	subTitle: PropTypes.node,
	subTitleLoading: PropTypes.bool,
	subTitleAs: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};
