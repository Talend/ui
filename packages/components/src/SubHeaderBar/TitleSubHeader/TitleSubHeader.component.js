import { useState } from 'react';
import PropTypes from 'prop-types';

import { InlineEditing } from '@talend/design-system';

import titleSubHeaderCssModule from './TitleSubHeader.module.scss';
import Inject from '../../Inject';
import getDefaultT from '../../translate';
import { getTheme } from '../../theme';
import { SubTitle } from './SubTitle.component';
import { Tooltip } from '@talend/design-system';
import { Icon } from '@talend/design-system';
import { SkeletonParagraph } from '@talend/design-system';
const theme = getTheme(titleSubHeaderCssModule);

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
	const [isEditMode, setIsEditMode] = useState(false);

	function handleSubmit(...args) {
		if (onSubmit) {
			onSubmit(...args);
		}
	}

	if (loading) {
		return <SkeletonParagraph />;
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
						<Tooltip title={title}>
							<h1 className={theme('tc-subheader-details-text-title-wording')} {...rest.titleProps}>
								{title}
							</h1>
						</Tooltip>
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

export { TitleSubHeader as default };
