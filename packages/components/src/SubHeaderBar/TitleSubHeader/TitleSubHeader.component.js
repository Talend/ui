import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '../../Skeleton';
import EditableText from '../../EditableText';
import titleSubHeaderCssModule from './TitleSubHeader.scss';
import Icon from '../../Icon';
import Inject from '../../Inject';
import getDefaultT from '../../translate';
import TooltipTrigger from '../../TooltipTrigger';
import { getTheme } from '../../theme';

const theme = getTheme(titleSubHeaderCssModule);

function TitleSubHeader({
	title,
	iconId,
	loading,
	inProgress,
	editable,
	getComponent,
	onEdit,
	onCancel,
	onSubmit,
	...rest
}) {
	const [isEditMode, setIsEditMode] = React.useState(false);
	function handleEdit(...args) {
		setIsEditMode(true);
		if (onEdit) {
			onEdit(...args);
		}
	}
	function handleCancel(...args) {
		setIsEditMode(false);
		if (onCancel) {
			onCancel(...args);
		}
	}
	function handleSubmit(...args) {
		setIsEditMode(false);
		if (onSubmit) {
			onSubmit(...args);
		}
	}
	if (loading) {
		return <Skeleton type={Skeleton.TYPES.text} size={Skeleton.SIZES.large} />;
	}
	const InjectedEditableText = Inject.get(getComponent, 'EditableText', EditableText);
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
						<InjectedEditableText
							text={title}
							inProgress={inProgress}
							feature="subheaderbar.rename"
							componentClass="h1"
							onEdit={handleEdit}
							onCancel={handleCancel}
							onSubmit={handleSubmit}
							editMode={isEditMode}
							{...rest}
						/>
					) : (
						<TooltipTrigger label={title} tooltipPlacement="bottom">
							<h1 className={theme('tc-subheader-details-text-title-wording')}>{title}</h1>
						</TooltipTrigger>
					)}
				</div>
				{!isEditMode ? <SubTitle {...rest} /> : null}
			</div>
		</div>
	);
}

function DefaultSubTitle({ subTitle }) {
	return <small className={theme('tc-subheader-details-text-subtitle')}>{subTitle}</small>;
}

DefaultSubTitle.propTypes = {
	subTitle: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

function SubTitle({ subTitleLoading, subTitle, subTitleAs: SubTitleAs = DefaultSubTitle }) {
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
		return <SubTitleAs subTitle={subTitle} />;
	}

	return null;
}

SubTitle.propTypes = {
	subTitle: PropTypes.node,
	subTitleLoading: PropTypes.bool,
	subTitleAs: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

TitleSubHeader.propTypes = {
	title: PropTypes.string.isRequired,
	iconId: PropTypes.string,
	loading: PropTypes.bool,
	inProgress: PropTypes.bool,
	editable: PropTypes.bool,
	subTitle: PropTypes.node,
	onEdit: PropTypes.func,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
	...Inject.PropTypes,
};

TitleSubHeader.defaultProps = {
	loading: false,
	inProgress: false,
	t: getDefaultT(),
	editable: false,
};

export { TitleSubHeader as default, SubTitle };
