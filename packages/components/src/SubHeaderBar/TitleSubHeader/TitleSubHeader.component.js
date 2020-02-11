import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Skeleton from '../../Skeleton';
import EditableText from '../../EditableText';
import theme from './TitleSubHeader.scss';
import Icon from '../../Icon';
import Inject from '../../Inject';
import getDefaultT from '../../translate';
import TooltipTrigger from '../../TooltipTrigger';

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
			className={classNames(theme['tc-subheader-details'], 'tc-subheader-details', {
				[theme['tc-subheader-details-blink']]: inProgress,
				'tc-subheader-details-blink': inProgress,
			})}
		>
			{iconId && (
				<Icon
					name={iconId}
					className={classNames(theme['tc-subheader-details-icon'], 'tc-subheader-details-icon')}
				/>
			)}
			<div className={classNames(theme['tc-subheader-details-text'], 'tc-subheader-details-text')}>
				<div
					className={classNames(
						theme['tc-subheader-details-text-title'],
						'tc-subheader-details-text-title',
					)}
				>
					{editable ? (
						<InjectedEditableText
							text={title}
							inProgress={inProgress}
							feature="subheaderbar.rename"
							componentClass="h1"
							onEdit={handleEdit}
							onCancel={handleCancel}
							onSubmit={handleSubmit}
							{...rest}
						/>
					) : (
						<TooltipTrigger label={title} tooltipPlacement="bottom">
							<h1
								className={classNames(
									theme['tc-subheader-details-text-title-wording'],
									'tc-subheader-details-text-title-wording',
								)}
							>
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

function SubTitle({ subTitleLoading, subTitle, asLabel, labelType }) {
	if (subTitleLoading) {
		return (
			<Skeleton
				className={classNames(
					theme['tc-subheader-details-loading-subtitle'],
					'tc-subheader-details-loading-subtitle',
				)}
				type={Skeleton.TYPES.text}
				size={Skeleton.SIZES.large}
			/>
		);
	}

	if (subTitle) {
		let subtitleClassnames;
		if (asLabel) {
			subtitleClassnames = classNames('label', 'tc-subheader-details-text-subtitle-label', {
				'label-info': labelType === 'INFO',
			});
		} else {
			classNames(theme['tc-subheader-details-text-subtitle'], 'tc-subheader-details-text-subtitle');
		}

		return (
			<div>
				<small className={subtitleClassnames}>{subTitle}</small>
			</div>
		);
	}

	return null;
}

SubTitle.propTypes = {
	subTitle: PropTypes.node,
	subTitleLoading: PropTypes.bool,
	asLabel: PropTypes.bool,
	labelType: PropTypes.string,
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
