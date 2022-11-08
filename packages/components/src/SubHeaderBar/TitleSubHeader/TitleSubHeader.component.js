import React from 'react';
import PropTypes from 'prop-types';

import { InlineEditing } from '@talend/design-system';

import Skeleton from '../../Skeleton';
import titleSubHeaderCssModule from './TitleSubHeader.module.scss';
import Icon from '../../Icon';
import Inject from '../../Inject';
import getDefaultT from '../../translate';
import TooltipTrigger from '../../TooltipTrigger';
import { getTheme } from '../../theme';

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

function SubTitle({
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

function TitleSubHeader({
	title,
	iconId,
	loading,
	inProgress,
	editable,
	getComponent,
	onCancel,
	onSubmit,
	...rest
}) {
	const [isEditMode, setIsEditMode] = React.useState(false);

	function handleSubmit(...args) {
		if (onSubmit) {
			onSubmit(...args);
		}
	}

	if (loading) {
		return <Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />;
	}

	const InjectedInlineEditingText = Inject.get(getComponent, 'InlineEditing', InlineEditing.Text);

	return (
		<div
			className={theme('tc-subheader-details', {
				'tc-subheader-details-blink': inProgress,
			})}
		>
			{iconId && <Icon name={iconId} className={theme('tc-subheader-details-icon')} />}
			<div className={theme('tc-subheader-details-text')}>
				<div className={theme('tc-subheader-details-text-title')}>
					{editable ? (
						<InjectedInlineEditingText
							required={true}
							renderValueAs="h1"
							label=""
							placeholder=""
							defaultValue={title}
							loading={loading}
							onToggle={setIsEditMode}
							onEdit={handleSubmit}
							data-feature="subheaderbar.rename"
							{...rest}
						/>
					) : (
						<TooltipTrigger label={title} tooltipPlacement="bottom">
							<h1 className={theme('tc-subheader-details-text-title-wording')} {...rest.titleProps}>
								{title}
							</h1>
						</TooltipTrigger>
					)}
				</div>
				{!isEditMode ? <SubTitle {...rest} /> : null}
			</div>
		</div>
	);
}

TitleSubHeader.propTypes = {
	title: PropTypes.string.isRequired,
	iconId: PropTypes.string,
	loading: PropTypes.bool,
	inProgress: PropTypes.bool,
	editable: PropTypes.bool,
	subTitle: PropTypes.node,
	onSubmit: PropTypes.func,
	t: PropTypes.func,
	...Inject.PropTypes,
};

TitleSubHeader.defaultProps = {
	loading: false,
	inProgress: false,
	t: getDefaultT(),
	editable: false,
};

export { TitleSubHeader as default, SubTitle };
