import PropTypes from 'prop-types';

import titleSubHeaderCssModule from './TitleSubHeader.module.scss';
import { getTheme } from '../../theme';
import { SkeletonParagraph } from '@talend/design-system';

const theme = getTheme(titleSubHeaderCssModule);

function DefaultSubTitle({ subTitle, subTitleProps }) {
	return (
		<small className={theme('tc-subheader-details-text-subtitle')} {...subTitleProps}>
			{subTitle}
		</small>
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
		return <SkeletonParagraph />;
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
